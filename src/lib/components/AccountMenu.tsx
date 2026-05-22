import { createSignal } from 'solid-js'
import { Bell, LogOut, Settings2 } from 'lucide-solid'
import UserAvatar from './UserAvatar'
import { signOut } from '~/lib/stores/auth'
import type { AppUser } from '~/lib/supabase'

type AccountMenuProps = {
  user: AppUser
}

export default function AccountMenu(props: AccountMenuProps) {
  const [open, setOpen] = createSignal(false)
  let triggerRef: HTMLButtonElement | undefined

  function handleClickOutside(event: MouseEvent) {
    if (triggerRef && !triggerRef.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  // Attach click-outside listener
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
  }

  return (
    <div class="relative">
      <button
        ref={triggerRef}
        type="button"
        class="flex w-12 items-center justify-center rounded-2xl py-2 transition-colors hover:bg-white/5 hover:text-white text-zinc-400 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 lg:w-full lg:justify-start lg:px-4"
        aria-label="アカウントメニューを開く"
        onClick={() => setOpen((v) => !v)}
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
      </button>

      {open() && (
        <div class="absolute left-14 bottom-0 z-50 min-w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md lg:left-full lg:bottom-auto lg:ml-2">
          <div class="px-2 py-1.5">
            <p class="truncate text-sm font-medium text-foreground">{props.user.name}</p>
            {props.user.email && (
              <p class="truncate text-xs text-muted-foreground">{props.user.email}</p>
            )}
          </div>
          <div class="my-1 h-px bg-muted" />
          <a
            href="/profile/settings"
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <Settings2 class="h-4 w-4" />
            設定
          </a>
          <a
            href="/notifications"
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <Bell class="h-4 w-4" />
            通知
          </a>
          <div class="my-1 h-px bg-muted" />
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive outline-none transition-colors hover:bg-destructive/10"
            onClick={() => {
              setOpen(false)
              signOut()
            }}
          >
            <LogOut class="h-4 w-4" />
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}
