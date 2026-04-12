import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'

import scheduleRoutes from './getSchedule'

dotenv.config()

const app = new Hono()
const frontendOrigin =
  process.env.FRONTEND_URL ??
  process.env.FRONTEND_ORIGIN ??
  'http://localhost:5173'

app.use(
  '/*',
  cors({
    origin: frontendOrigin,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)

app.get('/', (c) => c.json({ status: 'ok' }))
app.route('/', scheduleRoutes)

const port = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running on http://localhost:${port}`)
})

export default app
