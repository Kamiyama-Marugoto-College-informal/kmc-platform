import { en } from './en'
import { ja } from './ja'

export type Locale = 'ja' | 'en'

export interface AppTranslation {
  loading: string
  signOut: string
  profileSettings: string
  mainLanguage: string
  languageDescription: string
  languageJapanese: string
  languageEnglish: string
  dashboard: string
  settings: string
  notifications: string
  openAccountMenu: string
}

export const translations: Record<Locale, AppTranslation> = {
  ja,
  en,
}

export function isLocale(value: string): value is Locale {
  return value === 'ja' || value === 'en'
}

export function t<Key extends keyof AppTranslation>(
  key: Key,
  locale: Locale,
): AppTranslation[Key] {
  return translations[locale][key]
}
