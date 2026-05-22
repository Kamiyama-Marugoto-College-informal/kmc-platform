import { Monitor, Moon, Sun } from 'lucide-solid'
import { DropdownMenu } from '@kobalte/core/dropdown-menu'
import { theme, setTheme, resolvedTheme } from '~/lib/stores/theme'

const ITEM_CLASS =
  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-default data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[checked]:bg-accent data-[checked]:text-accent-foreground'

export default function ThemeToggle() {
  return (
    <DropdownMenu placement="bottom-end" gutter={8}>
      <DropdownMenu.Trigger
        class="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="テーマを変更"
      >
        {resolvedTheme() === 'dark' ? (
          <Moon class="h-4 w-4" />
        ) : (
          <Sun class="h-4 w-4" />
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content class="z-50 min-w-[10rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none">
          <DropdownMenu.RadioGroup
            value={theme()}
            onChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
          >
            <DropdownMenu.RadioItem value="light" class={ITEM_CLASS}>
              <Sun class="h-4 w-4" />
              ライト
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark" class={ITEM_CLASS}>
              <Moon class="h-4 w-4" />
              ダーク
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="system" class={ITEM_CLASS}>
              <Monitor class="h-4 w-4" />
              システム
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}
