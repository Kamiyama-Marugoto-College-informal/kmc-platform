import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/layout/AppShell'
import { useAuth } from './hooks/useAuth'
import { LoginPage } from './pages/(auth)/login'
import { DashboardPage } from './pages/dashboard'
import { NotificationsPage } from './pages/notifications'
import { ProfileSettingsPage } from './pages/profile/settings'

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell user={user} />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile/settings" element={<ProfileSettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
