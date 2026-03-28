import ja from './locales/ja'
import en from './locales/en'

export type Language = 'ja' | 'en'
export type TranslationKey = keyof typeof ja

export const translations: Record<Language, typeof ja> = { ja, en }
