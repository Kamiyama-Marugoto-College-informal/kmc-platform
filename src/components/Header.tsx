import { Link, NavLink } from 'react-router-dom'

import { HeaderAccountMenu } from '@/components/HeaderAccountMenu'
import { cn } from '@/lib/utils'
import type { AppUser } from '@/lib/supabase'

interface HeaderProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
  labels: {
    dashboard: string
    settings: string
    notifications: string
    signOut: string
    openAccountMenu: string
  }
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-2 py-1 text-sm transition-colors hover:text-foreground',
    isActive ? 'font-medium text-foreground' : 'text-muted-foreground',
  )

export function Header({ user, labels }: HeaderProps) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-border bg-background px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <Link
          to="/"
          className="shrink-0 font-semibold tracking-tight text-foreground hover:opacity-90"
        >
          KMC Platform
        </Link>
        <nav
          className="flex flex-wrap items-center gap-4 text-sm"
          aria-label="メイン"
        >
          <NavLink to="/" end className={navLinkClass}>
            {labels.dashboard}
          </NavLink>
        </nav>
      </div>
      <HeaderAccountMenu user={user} labels={labels} />
    </header>
  )
}
