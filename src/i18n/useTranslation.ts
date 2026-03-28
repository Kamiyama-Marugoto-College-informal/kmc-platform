import { translations, type TranslationKey } from './translations'
import { useLanguage } from './LanguageContext'

export function useTranslation() {
  const { language, setLanguage } = useLanguage()

  function t(key: TranslationKey, params?: Record<string, string>): string {
    let text: string = translations[language][key]
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v)
      }
    }
    return text
  }

  return { t, language, setLanguage }
}
