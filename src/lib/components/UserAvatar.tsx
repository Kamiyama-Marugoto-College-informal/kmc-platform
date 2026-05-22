import { cn } from '~/lib/utils'

type Role = 'student' | 'staff' | 'admin'

const roleBadge: Record<Role, { label: string; className: string }> = {
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

type UserAvatarProps = {
  name: string
  image?: string | null
  role: string
  className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const badge = () => roleBadge[(props.role as Role) ?? 'student'] ?? roleBadge.student
  const initial = () => props.name.charAt(0).toUpperCase()

  return (
    <div class={cn('relative inline-flex items-center justify-center overflow-visible', props.className)}>
      <div class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-muted">
        {props.image ? (
          <img src={props.image} alt={props.name} class="h-full w-full object-cover" />
        ) : (
          <span class="text-sm font-semibold">{initial()}</span>
        )}
      </div>
      <span
        class={cn(
          'absolute -top-1 -right-1 z-10 flex h-4 min-h-4 items-center justify-center rounded-full px-1 py-0 text-[10px] font-semibold leading-none ring-2 ring-background',
          badge().className,
        )}
      >
        {badge().label}
      </span>
    </div>
  )
}
