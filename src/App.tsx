import { useAuth } from './hooks/useAuth'
import { UserAvatar } from './components/UserAvatar'
import { LoginPage } from './(auth)/login'
import { supabase } from './lib/supabase'
import { useTranslation } from './i18n/useTranslation'
import './App.css'

function App() {
  const { user, loading, authError } = useAuth()
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="auth-center">
        <p>{t('loading')}</p>
      </div>
    )
  }

  const translatedAuthError =
    authError?.type === 'domain_not_allowed'
      ? t('emailDomainNotAllowed', { domain: authError.domain })
      : null

  if (!user) {
    return <LoginPage error={translatedAuthError} />
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>KMC Platform</h1>
        <div className="user-info">
          <UserAvatar name={user.name} image={user.image} role={user.role} />
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button
            className="signout-btn"
            onClick={() => supabase.auth.signOut()}
          >
            {t('logout')}
          </button>
        </div>
      </header>
      <main>
        <p>{t('welcome', { name: user.name })}</p>
      </main>
    </div>
  )
}

export default App
