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

interface HeaderAccountMenuProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
  labels: {
    settings: string
    notifications: string
    signOut: string
    openAccountMenu: string
  }
}

export function HeaderAccountMenu({ user, labels }: HeaderAccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'rounded-full outline-none transition-opacity hover:opacity-90',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
          aria-label={labels.openAccountMenu}
        >
          <UserAvatar name={user.name} image={user.image} role={user.role} />
        </button>
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
            {labels.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/notifications">
            <Bell />
            {labels.notifications}
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
          {labels.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
