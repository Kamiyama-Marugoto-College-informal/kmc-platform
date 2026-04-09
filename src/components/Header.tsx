import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  return (
    <header className="flex w-full items-center gap-3 border-b border-border bg-card px-4 py-3 shadow-[0_1px_2px_rgba(60,64,67,0.08)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
      <SidebarTrigger className="-ms-1" />
    </header>
  )
}
