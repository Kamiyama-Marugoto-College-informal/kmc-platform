import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Role = 'student' | 'staff' | 'admin'

const roleRing: Record<Role, string> = {
  student: 'ring-[var(--role-student)]',
  staff: 'ring-[var(--role-staff)]',
  admin: 'ring-[var(--role-admin)]',
}

interface UserAvatarProps {
  name: string
  image?: string | null
  role: string
}

export function UserAvatar({ name, image, role }: UserAvatarProps) {
  const ring = roleRing[(role as Role) ?? 'student'] ?? roleRing.student
  const initial = name.charAt(0).toUpperCase()

  return (
    <Avatar className={cn('ring-2 ring-offset-2 ring-offset-background', ring)}>
      {image ? <AvatarImage src={image} alt={name} /> : null}
      <AvatarFallback className="font-semibold">{initial}</AvatarFallback>
    </Avatar>
  )
}
