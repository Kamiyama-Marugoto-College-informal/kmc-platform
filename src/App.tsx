import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { MainLanguageProvider } from '@/context/MainLanguageContext'
import {
  detectBrowserLanguage,
  mainLanguageMessages,
} from '@/lib/mainLanguage'
import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/pages/(auth)/login'
import { DashboardPage } from '@/pages/dashboard'
import { NotificationsPage } from '@/pages/notifications'
import { ProfileSettingsPage } from '@/pages/profile/settings'

function App() {
  const { user, loading, authError } = useAuth()

  if (loading) {
    const t = mainLanguageMessages[detectBrowserLanguage()]
    return (
      <div className="flex min-h-svh items-center justify-center p-4">
        <p className="text-muted-foreground">{t.loading}</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage error={authError} />
  }

  const shellUser = {
    name: user.name,
    image: user.image,
    role: user.role,
  }

  return (
    <BrowserRouter>
      <MainLanguageProvider>
        <Routes>
          <Route path="/" element={<AppShell user={shellUser} />}>
            <Route index element={<DashboardPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route
              path="profile/settings"
              element={<ProfileSettingsPage />}
            />
            <Route path="dashboard" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </MainLanguageProvider>
    </BrowserRouter>
  )
}

export default App
