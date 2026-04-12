import { Hono } from 'hono'
import { google } from 'googleapis'
import { OAuth2Client, type Credentials } from 'google-auth-library'
const scheduleRoutes = new Hono()

const frontendOrigin =
  process.env.FRONTEND_URL ??
  process.env.FRONTEND_ORIGIN ??
  'http://localhost:5173'
const allowedEmail = '4grade@kamiyama.ac.jp'
const serverOrigin = process.env.SERVER_URL ?? `http://localhost:${process.env.PORT ?? '3000'}`
const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_ID
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_SECRET
const googleRedirectUri =
  process.env.GOOGLE_REDIRECT_URI ?? `${serverOrigin}/auth/google/callback`

const oauth2Client = new OAuth2Client(
  googleClientId,
  googleClientSecret,
  googleRedirectUri
)

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// 本当はDBやセッションストアに入れるべき。
// サンプルなのでメモリ保持にしてる。
const tokenStore = new Map<string, Credentials>()

function randomState() {
  return crypto.randomUUID()
}

// ログイン開始
scheduleRoutes.get('/auth/google', async (c) => {
  if (!googleClientId || !googleClientSecret) {
    return c.json(
      {
        error:
          'Google OAuth is not configured. Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET (or GOOGLE_ID/GOOGLE_SECRET).',
      },
      500,
    )
  }

  const state = randomState()

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    state,
  })

  return c.json({ url: authUrl, state })
})

// OAuth callback
scheduleRoutes.get('/auth/google/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const error = c.req.query('error')

    if (error) {
      return c.text(`OAuth error: ${error}`, 400)
    }

    if (!code) {
      return c.text('Missing code', 400)
    }

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    })

    const me = await oauth2.userinfo.get()
    const email = me.data.email

    if (!email) {
      return c.text('Failed to get user email', 400)
    }

    // ここで 4grade@kamiyama.ac.jp 以外を弾く
    if (email !== allowedEmail) {
      return c.text(`Unauthorized account: ${email}`, 403)
    }

    tokenStore.set(email, tokens)

    // SPA の index.html に戻す（クエリ依存を持たせない）
    return c.redirect(frontendOrigin)
  } catch (error) {
    console.error('OAuth callback failed:', error)
    return c.text('OAuth callback failed', 500)
  }
})

// 予定取得
scheduleRoutes.get('/api/calendar/events', async (c) => {
  try {
    if (!googleClientId || !googleClientSecret) {
      return c.json(
        {
          error:
            'Google OAuth is not configured. Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET (or GOOGLE_ID/GOOGLE_SECRET).',
        },
        500,
      )
    }

    const tokens = tokenStore.get(allowedEmail)

    if (!tokens) {
      return c.json({ error: 'not authenticated' }, 401)
    }

    const auth = new OAuth2Client(
      googleClientId,
      googleClientSecret,
      googleRedirectUri,
    )
    auth.setCredentials(tokens)

    const calendar = google.calendar({
      version: 'v3',
      auth,
    })

    const timeMinParam = c.req.query('timeMin')
    const timeMaxParam = c.req.query('timeMax')
    const maxResultsParam = c.req.query('maxResults')

    const timeMin = timeMinParam ? new Date(timeMinParam) : new Date()
    const timeMax = timeMaxParam ? new Date(timeMaxParam) : undefined
    const maxResults = maxResultsParam ? Number(maxResultsParam) : 200

    if (Number.isNaN(timeMin.getTime())) {
      return c.json({ error: 'invalid timeMin' }, 400)
    }
    if (timeMax && Number.isNaN(timeMax.getTime())) {
      return c.json({ error: 'invalid timeMax' }, 400)
    }
    if (
      !Number.isInteger(maxResults) ||
      maxResults <= 0 ||
      maxResults > 1000
    ) {
      return c.json({ error: 'invalid maxResults' }, 400)
    }

    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax?.toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return c.json({
      items: result.data.items ?? [],
    })
  } catch (error) {
    console.error('Calendar events fetch failed:', error)
    return c.json({ error: 'calendar fetch failed' }, 500)
  }
})

export default scheduleRoutes
