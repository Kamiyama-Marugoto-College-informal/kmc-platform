import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Language = 'ja' | 'en'

const LANG_STORAGE_KEY = 'mainLanguage'

const messages = {
  ja: {
    getStarted: 'はじめに',
    editHintPrefix: '編集して保存すると',
    editHintSuffix: 'を確認できます',
    countLabel: 'カウント',
    documentation: 'ドキュメント',
    docsSubtext: '質問への回答をまとめています',
    exploreVite: 'Vite を見る',
    learnMore: '詳しく学ぶ',
    connect: 'コミュニティ',
    connectSubtext: 'Vite コミュニティに参加する',
    profileSettings: 'プロフィール設定',
    mainLanguage: 'メイン言語',
    languageDescription:
      '表示言語を選択できます。選択内容はブラウザに保存されます。',
    japanese: '日本語',
    english: 'English',
  },
  en: {
    getStarted: 'Get started',
    editHintPrefix: 'Edit',
    editHintSuffix: 'and save to test',
    countLabel: 'Count is',
    documentation: 'Documentation',
    docsSubtext: 'Your questions, answered',
    exploreVite: 'Explore Vite',
    learnMore: 'Learn more',
    connect: 'Connect with us',
    connectSubtext: 'Join the Vite community',
    profileSettings: 'Profile settings',
    mainLanguage: 'Main language',
    languageDescription:
      'Choose your display language. The selection is saved in your browser.',
    japanese: '日本語',
    english: 'English',
  },
} as const

function isLanguage(value: string): value is Language {
  return value === 'ja' || value === 'en'
}

function ignoreStorageError() {
  return
}

function detectInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const savedLanguage = window.localStorage.getItem(LANG_STORAGE_KEY)
      if (savedLanguage && isLanguage(savedLanguage)) {
        return savedLanguage
      }
    } catch {
      ignoreStorageError()
    }

    return window.navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
  }

  return 'en'
}

function App() {
  const [count, setCount] = useState(0)
  const [language, setLanguage] = useState<Language>(detectInitialLanguage)
  const t = messages[language]

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, language)
    } catch {
      ignoreStorageError()
    }
    document.documentElement.lang = language
  }, [language])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{t.getStarted}</h1>
          <p>
            <span>{t.editHintPrefix}</span> <code>src/App.tsx</code>{' '}
            <span>{t.editHintSuffix}</span> <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {t.countLabel} {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="profile-settings">
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

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>{t.documentation}</h2>
          <p>{t.docsSubtext}</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                {t.exploreVite}
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                {t.learnMore}
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>{t.connect}</h2>
          <p>{t.connectSubtext}</p>
          <ul>
            <li>
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
