import { Bell, LayoutGrid, Settings2 } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { HeaderAccountMenu } from '@/components/HeaderAccountMenu'
import { cn } from '@/lib/utils'
import type { AppUser } from '@/lib/supabase'

interface AppToolbarProps {
  user: Pick<AppUser, 'name' | 'image' | 'role' | 'email'>
}

const nav = [
  { to: '/', end: true as const, label: 'ダッシュボード', icon: LayoutGrid },
  { to: '/notifications', end: false as const, label: '通知', icon: Bell },
  {
    to: '/profile/settings',
    end: false as const,
    label: '設定',
    icon: Settings2,
  },
] as const

export function AppToolbar({ user }: AppToolbarProps) {
  return (
    <header className="sticky top-0 z-40 flex w-full shrink-0 flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-2 shadow-[0_1px_2px_rgba(60,64,67,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
      <Link
        to="/"
        className="flex shrink-0 items-center gap-2 rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutGrid className="size-4" />
        </div>
        <div className="hidden leading-tight sm:block">
          <span className="block font-semibold tracking-tight">Campus</span>
          <span className="block text-xs text-muted-foreground">Learning</span>
        </div>
      </Link>

      <nav
        role="toolbar"
        aria-label="メイン"
        className="order-last flex w-full min-w-0 flex-1 basis-full items-center gap-1 overflow-x-auto sm:order-none sm:w-auto sm:basis-auto md:justify-center"
      >
        {nav.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center">
        <HeaderAccountMenu user={user} />
      </div>
    </header>
  )
}
