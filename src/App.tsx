import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ThemeToggle } from '@/components/ThemeToggle'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MainLanguageProvider, detectBrowserLanguage, t } from '@/lib/i18n'
import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/pages/(auth)/login'
import { DashboardPage } from '@/pages/dashboard'
import { NotificationsPage } from '@/pages/notifications'
import { ProfileSettingsPage } from '@/pages/profile/settings'
import SchedulePage from '@/pages/schedule'

/** 固定 Sidebar（`Sidebar.tsx`）分の左余白 */
function AppMainLayout() {
  return (
    <div className="min-h-svh pl-28 lg:pl-72 pr-4 py-4">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}

function App() {
  const { user, loading, authError } = useAuth()

  if (loading) {
    const loadingText = t('common.loading', detectBrowserLanguage())
    return (
      <div className="flex min-h-svh items-center justify-center p-4">
        <p className="text-muted-foreground">{loadingText}</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage error={authError} />
          )
        }
      />
      <Route
        path="/"
        element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
      />
      <Route
        element={
          user ? (
            <TooltipProvider>
              <MainLanguageProvider>
                <AppMainLayout />
              </MainLanguageProvider>
            </TooltipProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile/settings" element={<ProfileSettingsPage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  )
}

export default App
