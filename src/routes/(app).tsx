import { createEffect, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import type { RouteSectionProps } from '@solidjs/router'
import { user, isLoading } from '~/lib/stores/auth'
import { tStore } from '~/lib/i18n'
import Sidebar from '~/lib/components/Sidebar'
import ThemeToggle from '~/lib/components/ThemeToggle'

export default function AppLayout(props: RouteSectionProps) {
  const navigate = useNavigate()

  createEffect(() => {
    if (isLoading()) return
    if (!user()) {
      navigate('/login', { replace: true })
    }
  })

  return (
    <Show
      when={!isLoading()}
      fallback={
        <div class="flex min-h-screen items-center justify-center p-4">
          <p class="text-muted-foreground">{tStore()('common.loading')}</p>
        </div>
      }
    >
      <Show when={user()}>
        {(currentUser) => (
          <>
            <Sidebar user={currentUser()} />
            <div class="min-h-screen pl-28 lg:pl-72 pr-4 py-4">
              <div class="mb-4 flex justify-end">
                <ThemeToggle />
              </div>
              {props.children}
            </div>
          </>
        )}
      </Show>
    </Show>
  )
}
