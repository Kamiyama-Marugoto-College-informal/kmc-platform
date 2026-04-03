import { HeaderAccountMenu } from '@/components/HeaderAccountMenu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { AppUser } from '@/lib/supabase'

interface HeaderProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between gap-3 border-b border-border bg-background px-4 py-3">
      <SidebarTrigger className="-ms-1" />
      <div className="ms-auto flex shrink-0 items-center">
        <HeaderAccountMenu user={user} />
      </div>
    </header>
  )
}
