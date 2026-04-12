import { Bell, LogOut, Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { UserAvatar } from '@/components/UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { AppUser } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

export type AccountMenuUser = Pick<AppUser, 'name' | 'email'>

/** ドロップダウン内のラベル + ナビ・ログアウト（サイドバー／ヘッダーで共有） */
export function AccountMenuContent({ user }: { user: AccountMenuUser }) {
  return (
    <>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>
          {user.email ? (
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          ) : null}
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to="/profile/settings">
          <Settings2 />
          設定
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/notifications">
          <Bell />
          通知
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        onSelect={() => {
          void supabase.auth.signOut()
        }}
      >
        <LogOut />
        ログアウト
      </DropdownMenuItem>
    </>
  )
}

interface HeaderAccountMenuProps {
  user: Pick<AppUser, 'name' | 'image' | 'role' | 'email'>
}

export function HeaderAccountMenu({ user }: HeaderAccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'rounded-full outline-none transition-opacity hover:opacity-90',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
          aria-label="アカウントメニューを開く"
        >
          <UserAvatar name={user.name} image={user.image} role={user.role} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <AccountMenuContent user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
