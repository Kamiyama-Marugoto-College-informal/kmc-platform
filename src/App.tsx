import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { useAuth } from '@/hooks/useAuth'
import { isLocale, t, type Locale } from '@/lib/i18n'
import { LoginPage } from '@/pages/(auth)/login'
import { DashboardPage } from '@/pages/dashboard'
import { NotificationsPage } from '@/pages/notifications'
import { ProfileSettingsPage } from '@/pages/profile/settings'

const LOCALE_STORAGE_KEY = 'kmc.locale'

function detectBrowserLocale(): Locale {
  return (window.navigator.language ?? '').toLowerCase().startsWith('ja')
    ? 'ja'
    : 'en'
}

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  try {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (savedLocale && isLocale(savedLocale)) {
      return savedLocale
    }
  } catch {
    // localStorage can be unavailable in some browser modes.
  }

  return detectBrowserLocale()
}

function App() {
  const { user, loading, authError } = useAuth()
  const [locale, setLocale] = useState<Locale>(detectInitialLocale)

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // localStorage can be unavailable in some browser modes.
    }
    document.documentElement.lang = locale
  }, [locale])

  const headerLabels = useMemo(
    () => ({
      dashboard: t('dashboard', locale),
      settings: t('settings', locale),
      notifications: t('notifications', locale),
      signOut: t('signOut', locale),
      openAccountMenu: t('openAccountMenu', locale),
    }),
    [locale],
  )

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center p-4">
        <p>{t('loading', locale)}</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage error={authError} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell user={user} labels={headerLabels} />}>
          <Route index element={<DashboardPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route
            path="profile/settings"
            element={
              <ProfileSettingsPage
                locale={locale}
                onLocaleChange={setLocale}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
