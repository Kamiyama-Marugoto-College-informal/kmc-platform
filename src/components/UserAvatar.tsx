import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Role = 'student' | 'staff' | 'admin'

const roleBadge: Record<
  Role,
  { label: string; className: string }
> = {
  student: {
    label: '学',
    className: 'bg-[var(--role-student)] text-white border-transparent',
  },
  staff: {
    label: '職',
    className: 'bg-[var(--role-staff)] text-white border-transparent',
  },
  admin: {
    label: '管',
    className: 'bg-[var(--role-admin)] text-white border-transparent',
  },
}

interface UserAvatarProps {
  name: string
  image?: string | null
  role: string
  className?: string
}

export function UserAvatar({ name, image, role, className }: UserAvatarProps) {
  const { label, className: badgeTone } =
    roleBadge[(role as Role) ?? 'student'] ?? roleBadge.student
  const initial = name.charAt(0).toUpperCase()

  return (
    <Avatar className={cn('overflow-visible', className)}>
      {image ? <AvatarImage src={image} alt={name} /> : null}
      <AvatarFallback className="font-semibold">{initial}</AvatarFallback>
      <Badge
        variant="default"
        aria-hidden
        className={cn(
          'absolute -top-1 -right-1 z-10 h-4 min-h-4 px-1 py-0 text-[10px] font-semibold leading-none ring-2 ring-background pointer-events-none',
          badgeTone,
        )}
      >
        {label}
      </Badge>
    </Avatar>
  )
}
