import { useState, useEffect } from 'react'
import { supabase, type AppUser } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null)
        setLoading(false)
        return
      }
      applySession(session.user, setUser, setAuthError).finally(() =>
        setLoading(false),
      )
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, authError }
}

async function applySession(
  supabaseUser: {
    id: string
    email?: string
    user_metadata?: Record<string, string>
  },
  setUser: (u: AppUser | null) => void,
  _setAuthError: (e: string | null) => void,
) {
  let role: AppUser['role'] = 'student'
  try {
    const { data } = await Promise.race([
      supabase
        .from('profiles')
        .upsert({ id: supabaseUser.id }, { onConflict: 'id' })
        .select('role')
        .single(),
      new Promise<{ data: null }>((resolve) =>
        setTimeout(() => resolve({ data: null }), 3000),
      ),
    ])
    role = (data?.role as AppUser['role']) ?? 'student'
  } catch {
    // profiles テーブル未作成・タイムアウトなどの場合は student として続行
  }

  const email = supabaseUser.email ?? ''

  const allowedDomain = import.meta.env.VITE_ALLOWED_DOMAIN as string
  if (
    role !== 'admin' &&
    allowedDomain &&
    !email.endsWith(`@${allowedDomain}`)
  ) {
    await supabase.auth.signOut()
    _setAuthError(`${allowedDomain} のメールアドレスのみ許可されています`)
    return
  }

  const meta = supabaseUser.user_metadata ?? {}
  setUser({
    id: supabaseUser.id,
    name: meta.full_name ?? meta.name ?? email,
    email,
    image: meta.avatar_url ?? meta.picture ?? null,
    role,
  })
}
