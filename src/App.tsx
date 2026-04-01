import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { UserAvatar } from './components/UserAvatar'
import { LoginPage } from './(auth)/login'
import { supabase } from './lib/supabase'
import './App.css'

type Language = 'ja' | 'en'

const LANG_STORAGE_KEY = 'mainLanguage'

const messages = {
  ja: {
    loading: '読み込み中...',
    signOut: 'ログアウト',
    welcome: 'ようこそ、{name} さん',
    profileSettings: 'プロフィール設定',
    mainLanguage: 'メイン言語',
    languageDescription:
      '表示言語を選択できます。選択内容はブラウザに保存されます。',
    japanese: '日本語',
    english: 'English',
  },
  en: {
    loading: 'Loading...',
    signOut: 'Sign out',
    welcome: 'Welcome, {name}',
    profileSettings: 'Profile settings',
    mainLanguage: 'Main language',
    languageDescription:
      'Choose your display language. The selection is saved in your browser.',
    japanese: 'Japanese',
    english: 'English',
  },
} as const

function isLanguage(value: string): value is Language {
  return value === 'ja' || value === 'en'
}

function ignoreStorageError(error: unknown) {
  void error
}

function detectBrowserLanguage(): Language {
  return (window.navigator.language ?? '').toLowerCase().startsWith('ja')
    ? 'ja'
    : 'en'
}

function detectInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const savedLanguage = window.localStorage.getItem(LANG_STORAGE_KEY)
      if (savedLanguage && isLanguage(savedLanguage)) {
        return savedLanguage
      }
    } catch (error) {
      ignoreStorageError(error)
    }

    return detectBrowserLanguage()
  }

  return 'en'
}

function formatWelcome(language: Language, name: string): string {
  return messages[language].welcome.replace('{name}', name)
}

function App() {
  const { user, loading, authError } = useAuth()
  const [language, setLanguage] = useState<Language>(detectInitialLanguage)
  const t = messages[language]

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, language)
    } catch (error) {
      ignoreStorageError(error)
    }
    document.documentElement.lang = language
  }, [language])

  if (loading) {
    return (
      <div className="auth-center">
        <p>{t.loading}</p>
      </div>
    )
  }

  if (!user) {
    return <LoginPage error={authError} />
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
            {t.signOut}
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        <p>{formatWelcome(language, user.name)}</p>
        <section className="profile-settings">
          <h2>{t.profileSettings}</h2>
          <p>{t.languageDescription}</p>
          <div className="language-row">
            <label htmlFor="main-language">{t.mainLanguage}</label>
            <select
              id="main-language"
              value={language}
              onChange={(event) => {
                const nextLanguage = event.target.value
                if (isLanguage(nextLanguage)) {
                  setLanguage(nextLanguage)
                }
              }}
            >
              <option value="ja">{t.japanese}</option>
              <option value="en">{t.english}</option>
            </select>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
