import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  return (
    <header className="flex w-full items-center gap-3 border-b border-border bg-background px-4 py-3">
      <SidebarTrigger className="-ms-1" />
    </header>
  )
}
