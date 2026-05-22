import { createSignal } from 'solid-js'
import { Monitor, Moon, Sun } from 'lucide-solid'
import { theme, setTheme, resolvedTheme } from '~/lib/stores/theme'
import { cn } from '~/lib/utils'

export default function ThemeToggle() {
  const [open, setOpen] = createSignal(false)
  let buttonRef: HTMLButtonElement | undefined

  function handleClickOutside(event: MouseEvent) {
    if (buttonRef && !buttonRef.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
  }

  function selectTheme(value: 'light' | 'dark' | 'system') {
    setTheme(value)
    setOpen(false)
  }

  return (
    <div class="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        class="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="テーマを変更"
        onClick={() => setOpen((v) => !v)}
      >
        {resolvedTheme() === 'dark' ? (
          <Moon class="h-4 w-4" />
        ) : (
          <Sun class="h-4 w-4" />
        )}
      </button>

      {open() && (
        <div class="absolute right-0 z-50 mt-2 min-w-[10rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <button
            class={cn(
              'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
              theme() === 'light' && 'bg-accent',
            )}
            onClick={() => selectTheme('light')}
          >
            <Sun class="h-4 w-4" />
            ライト
          </button>
          <button
            class={cn(
              'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
              theme() === 'dark' && 'bg-accent',
            )}
            onClick={() => selectTheme('dark')}
          >
            <Moon class="h-4 w-4" />
            ダーク
          </button>
          <button
            class={cn(
              'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
              theme() === 'system' && 'bg-accent',
            )}
            onClick={() => selectTheme('system')}
          >
            <Monitor class="h-4 w-4" />
            システム
          </button>
        </div>
      )}
    </div>
  )
}
