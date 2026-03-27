import { LoginPage } from './(auth)/login'
import { UserAvatar } from './components/UserAvatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuth } from './hooks/useAuth'
import { supabase } from './lib/supabase'

function App() {
  const { user, loading, authError } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage error={authError} />
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          KMC Platform
        </h1>
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} image={user.image} role={user.role} />
          <div className="hidden text-left sm:flex sm:flex-col sm:gap-0.5">
            <span className="text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="text-xs capitalize text-muted-foreground">
              {user.role}
            </span>
          </div>
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => supabase.auth.signOut()}
          >
            ログアウト
          </Button>
        </div>
      </header>
      <main className="flex-1 p-8 text-left">
        <p className="text-foreground">ようこそ、{user.name} さん</p>
      </main>
    </div>
  )
}

export default App
