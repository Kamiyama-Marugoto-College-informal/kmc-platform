export type Language = 'ja' | 'en'

export const translations = {
  ja: {
    loading: '読み込み中...',
    logout: 'ログアウト',
    welcome: 'ようこそ、{name} さん',
    loginTitle: 'KMC Platform',
    loginSubtitle: 'kamiyama.ac.jp アカウントでログインしてください',
    loginWithGoogle: 'Google でログイン',
    loginFailed: 'ログインに失敗しました',
    emailDomainNotAllowed: '{domain} のメールアドレスのみ許可されています',
  },
  en: {
    loading: 'Loading...',
    logout: 'Sign out',
    welcome: 'Welcome, {name}',
    loginTitle: 'KMC Platform',
    loginSubtitle: 'Please sign in with your kamiyama.ac.jp account',
    loginWithGoogle: 'Sign in with Google',
    loginFailed: 'Failed to sign in',
    emailDomainNotAllowed: 'Only {domain} email addresses are allowed',
  },
} as const

export type TranslationKey = keyof typeof translations.ja
