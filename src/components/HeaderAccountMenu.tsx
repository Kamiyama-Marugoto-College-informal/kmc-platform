import { Bell, CircleUser, LogOut, Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AppUser } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

interface HeaderAccountMenuProps {
  user: Pick<AppUser, 'name' | 'role'>
}

export function HeaderAccountMenu({ user }: HeaderAccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="アカウントメニューを開く"
        >
          <CircleUser className="size-5" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuLabel className="font-normal">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
