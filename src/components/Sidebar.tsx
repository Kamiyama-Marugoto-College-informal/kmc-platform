import {
  LayoutGrid,
  Book,
  CheckSquare,
  CalendarDays,
  MessageCircle,
  Settings,
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
import { useAuth } from '@/hooks/useAuth'
import { useIsMobile } from '@/hooks/use-mobile'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user } = useAuth()
  const isMobile = useIsMobile()

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: Book },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Schedule', icon: CalendarDays },
    { id: 'messages', label: 'Chat', icon: MessageCircle },
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
            const isActive = activeTab === item.id
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-6 rounded-2xl transition-all duration-200 group relative justify-center lg:justify-start hover:bg-white/10 hover:text-white',
                  isActive &&
                    'bg-white text-zinc-900 shadow-lg shadow-white/10 hover:bg-white hover:text-zinc-900',
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform group-hover:scale-110',
                    isActive && 'text-zinc-900',
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
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 space-y-2 flex flex-col items-center lg:items-stretch">
        <Separator className="bg-white/10 mb-2" />
        <Button
          variant="ghost"
          onClick={() => setActiveTab('settings')}
          className={cn(
            'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-6 rounded-2xl transition-colors justify-center lg:justify-start hover:bg-white/5 hover:text-white text-zinc-500',
            activeTab === 'settings' && 'bg-white/10 text-white',
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium hidden lg:block">Settings</span>
        </Button>

        <Separator className="bg-white/5 my-2" />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-12 h-12 lg:w-full lg:h-auto flex items-center gap-3 px-0 lg:px-4 py-6 rounded-2xl transition-colors justify-center lg:justify-start hover:bg-white/5 hover:text-white text-zinc-400',
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
                <span className="font-medium hidden lg:block truncate text-left text-white">
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
            className="w-12 h-12 lg:w-full lg:min-h-12 flex items-center justify-center lg:justify-start lg:px-4 rounded-2xl text-zinc-500 text-xs"
            aria-hidden
          >
            …
          </div>
        )}
        
        {/*<Button
          variant="ghost"
          className="flex items-center gap-3 px-0 lg:px-4 py-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 w-full justify-center lg:justify-start"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium hidden lg:block text-sm">Sign Out</span>
        </Button>*/}
      </div>
    </aside>
  )
}
