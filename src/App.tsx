import { LoginPage } from './(auth)/login'
import { Header } from './components/Header'
import { useAuth } from './hooks/useAuth'

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
    <div className="min-h-svh flex flex-col">
      <Header user={user} />
    </div>
  )
}

export default App
