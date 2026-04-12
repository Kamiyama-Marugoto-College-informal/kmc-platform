import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { ja } from './ja.ts'
import { en } from './en.ts'

export type MainLanguage = 'ja' | 'en'

type MainLanguageMessages = typeof ja

export const LANG_STORAGE_KEY = 'mainLanguage'

export const mainLanguageMessages: Record<MainLanguage, MainLanguageMessages> =
  {
    ja,
    en,
  }

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
  return mainLanguageMessages[language].common.welcome.replace('{name}', name)
}

export function formatFooterCopyright(
  language: MainLanguage,
  year: number,
): string {
  return mainLanguageMessages[language].footer.copyright.replace(
    '{year}',
    String(year),
  )
}

export function t(key: string, locale: string): string {
  const keys = key.split('.')
  let value: unknown =
    mainLanguageMessages[isMainLanguage(locale) ? locale : 'en']
  for (const k of keys) {
    if (!value || typeof value !== 'object') {
      return key
    }
    value = (value as Record<string, unknown>)[k]
  }
  return typeof value === 'string' ? value : key
}

const MainLanguageContext = createContext<{
  language: MainLanguage
  setLanguage: (language: MainLanguage) => void
} | null>(null)

export function MainLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<MainLanguage>(() =>
    detectInitialLanguage(),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, language)
    } catch (error) {
      ignoreStorageError(error)
    }
    document.documentElement.lang = language
  }, [language])

  return createElement(
    MainLanguageContext.Provider,
    { value: { language, setLanguage } },
    children,
  )
}

export function useMainLanguage() {
  const ctx = useContext(MainLanguageContext)
  if (!ctx) {
    throw new Error('useMainLanguage must be used within MainLanguageProvider')
  }
  return ctx
}

export function useT() {
  const { language } = useMainLanguage()
  return useCallback((key: string) => t(key, language), [language])
}

export { ja, en }
