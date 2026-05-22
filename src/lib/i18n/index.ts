import { createSignal, createMemo } from 'solid-js'

import { ja } from './ja'
import { en } from './en'

export type MainLanguage = 'ja' | 'en'

export type MainLanguageMessages = typeof ja

export const LANG_STORAGE_KEY = 'mainLanguage'
export const mainLanguageMessages: Record<MainLanguage, MainLanguageMessages> = {
  ja,
  en: en as unknown as MainLanguageMessages,
}

export function isMainLanguage(value: string): value is MainLanguage {
  return value === 'ja' || value === 'en'
}

export function detectBrowserLanguage(): MainLanguage {
  const raw = typeof window !== 'undefined' ? (window.navigator.language ?? '') : ''
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
  } catch {
    // ignore
  }
  return detectBrowserLanguage()
}

export function formatWelcome(lang: MainLanguage, name: string): string {
  return mainLanguageMessages[lang].common.welcome.replace('{name}', name)
}

export function formatFooterCopyright(lang: MainLanguage, year: number): string {
  return mainLanguageMessages[lang].footer.copyright.replace('{year}', String(year))
}

export function t(key: string, locale: string): string {
  const keys = key.split('.')
  let value: unknown = mainLanguageMessages[isMainLanguage(locale) ? locale : 'en']
  for (const k of keys) {
    if (!value || typeof value !== 'object') {
      return key
    }
    value = (value as Record<string, unknown>)[k]
  }
  return typeof value === 'string' ? value : key
}

const [language, setLanguageInternal] = createSignal<MainLanguage>(detectInitialLanguage())

export function setLanguage(lang: MainLanguage) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    // ignore
  }
  document.documentElement.lang = lang
  setLanguageInternal(lang)
}

export { language }

export const tStore = createMemo(() => {
  const lang = language()
  return (key: string) => t(key, lang)
})
