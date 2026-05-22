import { createMemo, For } from 'solid-js'
import { useLocation } from '@solidjs/router'
import {
  LayoutGrid,
  Book,
  CheckSquare,
  CalendarDays,
  MessageCircle,
  Hexagon,
} from 'lucide-solid'
import { cn } from '~/lib/utils'
import type { AppUser } from '~/lib/supabase'
import AccountMenu from './AccountMenu'

type MenuItem = {
  id: string
  label: string
  icon: typeof LayoutGrid
  isActive?: boolean
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
  { id: 'courses', label: 'Courses', icon: Book, isActive: false },
  { id: 'assignments', label: 'Tasks', icon: CheckSquare, isActive: false },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'messages', label: 'Chat', icon: MessageCircle, isActive: false },
]

type SidebarProps = {
  user: AppUser
}

export default function Sidebar(props: SidebarProps) {
  const location = useLocation()

  const activeTab = createMemo(() => {
    const path = location.pathname
    const match = menuItems.find((item) => path.startsWith(`/${item.id}`))
    return match?.id ?? 'dashboard'
  })

  return (
    <aside class="fixed left-4 top-4 bottom-4 w-20 lg:w-64 bg-zinc-900 text-white rounded-3xl flex flex-col shadow-2xl shadow-zinc-900/20 z-50 transition-all duration-300 overflow-hidden">
      {/* Logo Area */}
      <div class="p-6 flex items-center gap-4 justify-center lg:justify-start">
        <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0">
          <Hexagon class="w-6 h-6 text-white fill-white/20" />
        </div>
        <span class="font-display font-bold text-xl tracking-tight hidden lg:block">
          Campus
        </span>
      </div>

      {/* Navigation */}
      <nav class="flex-1 overflow-y-auto px-3">
        <div class="py-6 space-y-2 flex flex-col items-center lg:items-stretch">
          <For each={menuItems}>
            {(item) => {
              const isSelected = () => activeTab() === item.id
              const isEnabled = () => item.isActive !== false

              return (
                <a href={`/${item.id}`} class="block">
                  <button
                    type="button"
                    disabled={!isEnabled()}
                    class={cn(
                      'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-3 rounded-2xl transition-all duration-200 group relative justify-center lg:justify-start hover:bg-white/10 hover:text-white',
                      isSelected() &&
                        isEnabled() &&
                        'bg-white text-zinc-900 shadow-lg shadow-white/10 hover:bg-white hover:text-zinc-900',
                      !isEnabled() && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <item.icon
                      class={cn(
                        'w-5 h-5 transition-transform group-hover:scale-110',
                        isSelected() && isEnabled() && 'text-zinc-900',
                      )}
                    />
                    <span class="font-medium hidden lg:block">
                      {item.label}
                    </span>

                    {/* Tooltip for mobile/collapsed */}
                    {!isEnabled() && (
                      <div class="absolute left-14 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                </a>
              )
            }}
          </For>
        </div>
      </nav>

      {/* Footer Actions */}
      <div class="p-4 space-y-2 flex flex-col items-center lg:items-stretch">
        <div class="bg-white/10 mb-2 h-px" />
        {props.user ? (
          <AccountMenu user={props.user} />
        ) : (
          <div
            class="w-12 h-12 lg:w-full lg:min-h-12 flex items-center justify-center lg:justify-start lg:px-4 rounded-2xl text-zinc-500 text-xs"
            aria-hidden="true"
          >
            …
          </div>
        )}
      </div>
    </aside>
  )
}
