import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  detectInitialLanguage,
  LANG_STORAGE_KEY,
  type MainLanguage,
} from '@/lib/mainLanguage'

function ignoreStorageError(error: unknown) {
  void error
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

  return (
    <MainLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </MainLanguageContext.Provider>
  )
}

export function useMainLanguage() {
  const ctx = useContext(MainLanguageContext)
  if (!ctx) {
    throw new Error('useMainLanguage must be used within MainLanguageProvider')
  }
  return ctx
}
