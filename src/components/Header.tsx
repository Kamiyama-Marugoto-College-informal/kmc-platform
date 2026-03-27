import { UserAvatar } from '@/components/UserAvatar'
import type { AppUser } from '@/lib/supabase'

interface HeaderProps {
  user: Pick<AppUser, 'name' | 'image' | 'role'>
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between border-b border-border bg-background px-4 py-3">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        KMC Platform
      </h1>
      <UserAvatar name={user.name} image={user.image} role={user.role} />
    </header>
  )
}
