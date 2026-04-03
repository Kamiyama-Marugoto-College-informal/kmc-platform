export type MainLanguage = 'ja' | 'en'

export const LANG_STORAGE_KEY = 'mainLanguage'

export const mainLanguageMessages = {
  ja: {
    loading: '読み込み中...',
    welcome: 'ようこそ、{name} さん',
    profileSettings: 'プロフィール設定',
    settingsPageIntro:
      '表示名や通知の受け取り方などをここで変更します。',
    mainLanguage: 'メイン言語',
    languageDescription:
      '表示言語を選択できます。選択内容はブラウザに保存されます。',
    japanese: '日本語',
    english: 'English',
  },
  en: {
    loading: 'Loading...',
    welcome: 'Welcome, {name}',
    profileSettings: 'Profile settings',
    settingsPageIntro:
      'Change how your name appears and how you receive notifications.',
    mainLanguage: 'Main language',
    languageDescription:
      'Choose your display language. The selection is saved in your browser.',
    japanese: 'Japanese',
    english: 'English',
  },
} as const

function ignoreStorageError(error: unknown) {
  void error
}

export function isMainLanguage(value: string): value is MainLanguage {
  return value === 'ja' || value === 'en'
}

export function detectBrowserLanguage(): MainLanguage {
  const raw =
    typeof window !== 'undefined' ? (window.navigator.language ?? '') : ''
  return raw.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

export function detectInitialLanguage(): MainLanguage {
  if (typeof window === 'undefined') {
    return 'en'
  }
  try {
    const savedLanguage = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (savedLanguage && isMainLanguage(savedLanguage)) {
      return savedLanguage
    }
  } catch (error) {
    ignoreStorageError(error)
  }
  return detectBrowserLanguage()
}

export function formatWelcome(language: MainLanguage, name: string): string {
  return mainLanguageMessages[language].welcome.replace('{name}', name)
}
