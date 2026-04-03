import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { AppUser } from '@/lib/supabase'

interface AppShellProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
}

export function AppShell({ user }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header user={user} />
        <div className="flex flex-1 flex-col bg-background">
          <div className="container mx-auto max-w-6xl flex-1 px-4 py-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
