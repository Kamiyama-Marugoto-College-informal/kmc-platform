import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Bell,
  ChevronsUpDown,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
} from 'lucide-react'

import { AccountMenuContent } from '@/components/HeaderAccountMenu'
import { UserAvatar } from '@/components/UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import type { AppUser } from '@/lib/supabase'

function useNavActive() {
  const { pathname } = useLocation()

  return {
    dashboard: pathname === '/',
    notifications: pathname === '/notifications',
    settings: pathname.startsWith('/profile/settings'),
  }
}

interface AppSidebarProps {
  user: Pick<AppUser, 'name' | 'image' | 'role' | 'email'>
}

export function AppSidebar({ user }: AppSidebarProps) {
  const active = useNavActive()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="KMC Platform">
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <span className="truncate font-semibold tracking-tight">
                  KMC Platform
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メイン</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={active.dashboard}
                  tooltip="ダッシュボード"
                >
                  <NavLink to="/" end>
                    <LayoutDashboard />
                    <span>ダッシュボード</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={active.notifications}
                  tooltip="通知"
                >
                  <NavLink to="/notifications">
                    <Bell />
                    <span>通知</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={active.settings}
                  tooltip="設定"
                >
                  <NavLink to="/profile/settings">
                    <Settings />
                    <span>設定</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip={user.name}
                >
                  <UserAvatar
                    name={user.name}
                    image={user.image}
                    role={user.role}
                    className="size-8 shrink-0"
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.name}
                    </span>
                    {user.email ? (
                      <span className="truncate text-xs text-sidebar-foreground/70">
                        {user.email}
                      </span>
                    ) : null}
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-sidebar-foreground/70" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side="top"
                align="start"
              >
                <AccountMenuContent user={user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
