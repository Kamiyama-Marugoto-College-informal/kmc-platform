import { createSignal } from 'solid-js'
import { supabase, type AppUser } from '~/lib/supabase'

const [user, setUser] = createSignal<AppUser | null>(null)
const [isLoading, setIsLoading] = createSignal(true)
const [authError, setAuthError] = createSignal<string | null>(null)

let subscription: { unsubscribe: () => void } | null = null

async function applySession(supabaseUser: {
  id: string
  email?: string
  user_metadata?: Record<string, string>
}) {
  const email = supabaseUser.email ?? ''
  let role: AppUser['role'] = 'student'

  try {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', supabaseUser.id)
      .single()
    if (data?.role) {
      role = data.role as AppUser['role']
    }
  } catch {
    // profiles 未登録時は student で続行
  }

  const allowedDomain = import.meta.env.VITE_ALLOWED_DOMAIN as string
  if (
    role !== 'admin' &&
    allowedDomain &&
    !email.endsWith(`@${allowedDomain}`)
  ) {
    await supabase.auth.signOut()
    setUser(null)
    setIsLoading(false)
    setAuthError(`${allowedDomain} のメールアドレスのみ許可されています`)
    return
  }

  const meta = supabaseUser.user_metadata ?? {}
  const appUser: AppUser = {
    id: supabaseUser.id,
    name: meta.full_name ?? meta.name ?? email,
    email,
    image: meta.avatar_url ?? meta.picture ?? null,
    role,
  }
  setUser(appUser)
  setIsLoading(false)
  setAuthError(null)
}

export function initAuth() {
  const {
    data: { subscription: sub },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) {
      setUser(null)
      setIsLoading(false)
      return
    }
    applySession(session.user).catch(() => {
      setIsLoading(false)
    })
  })
  subscription = sub
}

export function destroyAuth() {
  subscription?.unsubscribe()
  subscription = null
}

export function signOut() {
  return supabase.auth.signOut()
}

export { user, isLoading, authError }
