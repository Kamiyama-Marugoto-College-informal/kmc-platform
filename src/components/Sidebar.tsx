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

function getStudentNumber(email: string): string | null {
  const match = email.match(/^kmc(\d+)@kamiyama\.ac\.jp$/i)
  return match?.[1] ?? null
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
}: SidebarProps) {
  const isMobile = useIsMobile()
  const studentNumber =
    user?.role === 'student' && user.email
      ? getStudentNumber(user.email)
      : null

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: Book },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'messages', label: 'Chat', icon: MessageCircle, isActive: false },
  ]

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-20 lg:w-64 bg-zinc-900 text-white rounded-3xl flex flex-col shadow-2xl shadow-zinc-900/20 z-50 transition-all duration-300 overflow-hidden">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-4 justify-center lg:justify-start">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0">
          <Hexagon className="w-6 h-6 text-white fill-white/20" />
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
                    'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-3 rounded-2xl transition-all duration-200 group relative justify-center lg:justify-start hover:bg-white/10 hover:text-white',
                    isSelected &&
                      isEnabled &&
                      'bg-white text-zinc-900 shadow-lg shadow-white/10 hover:bg-white hover:text-zinc-900',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-transform group-hover:scale-110',
                      isSelected && isEnabled && 'text-zinc-900',
                    )}
                  />
                  <span className="font-medium hidden lg:block">
                    {item.label}
                  </span>

                  {/* Tooltip for mobile/collapsed */}
                  <div className="absolute left-14 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity whitespace-nowrap z-50">
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
        <Separator className="bg-white/10 mb-2" />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-2 rounded-2xl transition-colors justify-center lg:justify-start hover:bg-white/5 hover:text-white text-zinc-400',
                  'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
                )}
                aria-label="アカウントメニューを開く"
              >
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  role={user.role}
                  className="size-8 rounded-lg"
                />
                <div className="hidden lg:flex min-w-0 flex-col items-start text-left">
                  <span className="w-full truncate font-medium text-white">
                    {user.name}
                  </span>
                  {studentNumber ? (
                    <span className="w-full truncate text-xs text-zinc-300">
                      ID: {studentNumber}
                    </span>
                  ) : null}
                </div>
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
            className="w-12 h-12 lg:w-full lg:min-h-12 flex items-center justify-center lg:justify-start lg:px-4 rounded-2xl text-zinc-500 text-xs"
            aria-hidden
          >
            …
          </div>
        )}
      </div>
    </aside>
  )
}
