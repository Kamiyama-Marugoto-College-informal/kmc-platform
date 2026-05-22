import { Bell, LogOut, Settings2 } from 'lucide-solid'
import { DropdownMenu } from '@kobalte/core/dropdown-menu'
import { useNavigate } from '@solidjs/router'
import UserAvatar from './UserAvatar'
import { signOut } from '~/lib/stores/auth'
import type { AppUser } from '~/lib/supabase'

type AccountMenuProps = {
  user: AppUser
}

export default function AccountMenu(props: AccountMenuProps) {
  const navigate = useNavigate()

  return (
    <DropdownMenu placement="right-start" gutter={8}>
      <DropdownMenu.Trigger
        class="flex w-12 items-center justify-center rounded-2xl py-2 transition-colors hover:bg-white/5 hover:text-white text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 lg:w-full lg:justify-start lg:px-4"
        aria-label="アカウントメニューを開く"
      >
        <UserAvatar
          name={props.user.name}
          image={props.user.image}
          role={props.user.role}
          className="size-8 rounded-lg"
        />
        <span class="hidden truncate text-left font-medium text-white lg:block">
          {props.user.name}
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content class="z-50 min-w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none">
          <div class="px-2 py-1.5">
            <p class="truncate text-sm font-medium text-foreground">
              {props.user.name}
            </p>
            {props.user.email && (
              <p class="truncate text-xs text-muted-foreground">
                {props.user.email}
              </p>
            )}
          </div>

          <DropdownMenu.Separator class="my-1 h-px bg-muted" />

          <DropdownMenu.Item
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-default hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
            onSelect={() => navigate('/profile/settings')}
          >
            <Settings2 class="h-4 w-4" />
            設定
          </DropdownMenu.Item>

          <DropdownMenu.Item
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-default hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
            onSelect={() => navigate('/notifications')}
          >
            <Bell class="h-4 w-4" />
            通知
          </DropdownMenu.Item>

          <DropdownMenu.Separator class="my-1 h-px bg-muted" />

          <DropdownMenu.Item
            class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive outline-none transition-colors cursor-default data-[highlighted]:bg-destructive/10"
            onSelect={signOut}
          >
            <LogOut class="h-4 w-4" />
            ログアウト
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}
