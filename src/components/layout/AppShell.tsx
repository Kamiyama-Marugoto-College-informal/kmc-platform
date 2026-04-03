import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import type { AppUser } from '@/lib/supabase'

interface AppShellProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
  labels: {
    dashboard: string
    settings: string
    notifications: string
    signOut: string
    openAccountMenu: string
  }
}

export function AppShell({ user, labels }: AppShellProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header user={user} labels={labels} />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
