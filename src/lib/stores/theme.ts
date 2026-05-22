import { createSignal } from 'solid-js'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // ignore
  }
  return 'system'
}

function getResolvedTheme(t: Theme): 'light' | 'dark' {
  if (t === 'system') {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return t
}

function applyTheme(t: Theme) {
  if (typeof window === 'undefined') return
  const resolved = getResolvedTheme(t)
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

const [theme, setThemeInternal] = createSignal<Theme>(getInitialTheme())

// Apply theme on first load
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme())

  // React to system theme changes when in system mode
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (theme() === 'system') {
        applyTheme('system')
      }
    })
}

export function setTheme(value: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
  applyTheme(value)
  setThemeInternal(value)
}

export function resolvedTheme(): 'light' | 'dark' {
  return getResolvedTheme(theme())
}

export { theme }
