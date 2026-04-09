import { Outlet } from 'react-router-dom'

import { AppToolbar } from '@/components/AppToolbar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import type { AppUser } from '@/lib/supabase'

interface AppShellProps {
  user: Pick<AppUser, 'name' | 'image' | 'role' | 'email'>
}

export function AppShell({ user }: AppShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <AppToolbar user={user} />
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto max-w-6xl flex-1 px-4 py-6">
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
