import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutGrid,
  Book,
  CheckSquare,
  CalendarDays,
  MessageCircle,
  Hexagon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AccountMenuContent } from '@/components/HeaderAccountMenu'
import { UserAvatar } from '@/components/UserAvatar'
import { useIsMobile } from '@/hooks/use-mobile'
import type { AppUser } from '@/lib/supabase'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  user: AppUser | null
}

type MenuItem = {
  id: string
  label: string
  icon: LucideIcon
  /** false のとき項目を無効化（クリック不可）。省略時は有効 */
  isActive?: boolean
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
}: SidebarProps) {
  const isMobile = useIsMobile()

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: Book },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'messages', label: 'Chat', icon: MessageCircle, isActive: false },
  ]

  return (
    <aside className="fixed left-4 top-4 bottom-4 z-50 flex w-20 flex-col overflow-hidden rounded-3xl bg-sidebar text-sidebar-foreground shadow-2xl shadow-black/20 transition-all duration-300 lg:w-64">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-4 justify-center lg:justify-start">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-sidebar-accent flex items-center justify-center backdrop-blur-sm">
          <Hexagon className="h-6 w-6 text-sidebar-accent-foreground fill-sidebar-accent-foreground/20" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight hidden lg:block">
          Campus
        </span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="py-6 space-y-2 flex flex-col items-center lg:items-stretch">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isSelected = activeTab === item.id
            const isEnabled = item.isActive !== false
            return (
              <Link key={item.id} to={`/${item.id}`}>
                <Button
                  variant="ghost"
                  disabled={!isEnabled}
                  onClick={() => isEnabled && setActiveTab(item.id)}
                  className={cn(
                    'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-3 rounded-2xl transition-all duration-200 group relative justify-center lg:justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isSelected &&
                      isEnabled &&
                      'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-transform group-hover:scale-110',
                      isSelected &&
                        isEnabled &&
                        'text-sidebar-primary-foreground',
                    )}
                  />
                  <span className="font-medium hidden lg:block">
                    {item.label}
                  </span>

                  {/* Tooltip for mobile/collapsed */}
                  <div className="absolute left-14 z-50 rounded border border-sidebar-border bg-sidebar px-2 py-1 text-xs whitespace-nowrap text-sidebar-foreground opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity">
                    {item.label}
                  </div>
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 space-y-2 flex flex-col items-center lg:items-stretch">
        <Separator className="mb-2 bg-sidebar-border" />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-2 rounded-2xl transition-colors justify-center lg:justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/70',
                  'focus-visible:ring-2 focus-visible:ring-sidebar-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
                )}
                aria-label="アカウントメニューを開く"
              >
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  role={user.role}
                  className="size-8 rounded-lg"
                />
                <span className="font-medium hidden lg:block truncate text-left text-sidebar-foreground">
                  {user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <AccountMenuContent user={user} />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className="w-12 h-12 lg:w-full lg:min-h-12 flex items-center justify-center lg:justify-start lg:px-4 rounded-2xl text-sidebar-foreground/50 text-xs"
            aria-hidden
          >
            …
          </div>
        )}
      </div>
    </aside>
  )
}
