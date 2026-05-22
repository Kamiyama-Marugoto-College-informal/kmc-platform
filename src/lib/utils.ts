import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MainLanguage } from '~/lib/i18n'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDisplayDate(
  language: MainLanguage,
  date: Date,
  withWeekday: boolean,
): string {
  return new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(withWeekday ? { weekday: 'short' } : {}),
  }).format(date)
}

export function formatTimeRange(
  language: MainLanguage,
  start: Date,
  end: Date,
): string {
  const locale = language === 'ja' ? 'ja-JP' : 'en-US'
  const timeFmt = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${timeFmt.format(start)} – ${timeFmt.format(end)}`
}
