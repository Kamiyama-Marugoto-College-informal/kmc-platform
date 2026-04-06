export type MainLanguage = 'ja' | 'en'

export const LANG_STORAGE_KEY = 'mainLanguage'

export const mainLanguageMessages = {
  ja: {
    loading: '読み込み中...',
    welcome: 'ようこそ、{name} さん',
    profileSettings: 'プロフィール設定',
    settingsPageIntro: '表示名や通知の受け取り方などをここで変更します。',
    mainLanguage: 'メイン言語',
    languageDescription:
      '表示言語を選択できます。選択内容はブラウザに保存されます。',
    japanese: '日本語',
    english: 'English',
    dashboardTitle: 'ダッシュボード',
    dashboardSubtitle: '今日の予定と締切をひと目で確認できます。',
    sectionTodaySchedule: '今日のスケジュール',
    sectionAssignments: '課題・締切',
    assignmentsCardDescription:
      '未完了の課題を締切が近い順に表示しています。',
    scheduleEmpty: '今日の予定はありません。',
    assignmentsEmpty: '表示する課題はありません。',
    assignmentDueOverdue: '期限超過',
    assignmentDueToday: '今日',
    assignmentDueThisWeek: '今週',
    assignmentDueLater: 'この先',
    footerCopyright: '© {year} KMC Platform',
    footerTerms: '利用規約',
    footerPrivacy: 'プライバシー',
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
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'See today’s schedule and assignment deadlines at a glance.',
    sectionTodaySchedule: 'Today’s schedule',
    sectionAssignments: 'Assignments',
    assignmentsCardDescription:
      'Incomplete assignments sorted by nearest due date.',
    scheduleEmpty: 'No events scheduled for today.',
    assignmentsEmpty: 'No assignments to show.',
    assignmentDueOverdue: 'Overdue',
    assignmentDueToday: 'Today',
    assignmentDueThisWeek: 'This week',
    assignmentDueLater: 'Later',
    footerCopyright: '© {year} KMC Platform',
    footerTerms: 'Terms',
    footerPrivacy: 'Privacy',
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

export function formatFooterCopyright(
  language: MainLanguage,
  year: number,
): string {
  return mainLanguageMessages[language].footerCopyright.replace(
    '{year}',
    String(year),
  )
}
