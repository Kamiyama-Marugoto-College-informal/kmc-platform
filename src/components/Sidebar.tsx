import { Link, NavLink, useLocation } from 'react-router-dom'
import { Bell, GalleryVerticalEnd, LayoutDashboard, Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

function useNavActive() {
  const { pathname } = useLocation()

  return {
    dashboard: pathname === '/',
    notifications: pathname === '/notifications',
    settings: pathname.startsWith('/profile/settings'),
  }
}

export function AppSidebar() {
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
      <SidebarRail />
    </Sidebar>
  )
}
