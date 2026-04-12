import { useMemo, useState, type KeyboardEvent } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  buildAssignmentCalendarItems,
  buildClassCalendarItems,
  type AssignmentCalendarItem,
  type ClassCalendarItem,
} from '@/data/mockSchedule'
import { useMainLanguage, useT } from '@/lib/i18n'
import { cn, formatDisplayDate, formatTimeRange } from '@/lib/utils'

type ScheduleTab = 'classes' | 'assignments'

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function startOfWeekMonday(reference: Date): Date {
  const d = startOfDay(reference)
  const day = d.getDay()
  const offset = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + offset)
  return monday
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDueDateTime(language: 'ja' | 'en', date: Date): string {
  return new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function dayLabel(language: 'ja' | 'en', date: Date): string {
  return new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
    weekday: 'short',
  }).format(date)
}

function weekTitle(language: 'ja' | 'en', weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6)
  return `${formatDisplayDate(language, weekStart, false)} - ${formatDisplayDate(language, weekEnd, false)}`
}

function groupClassesByDay(
  days: Date[],
  classes: ClassCalendarItem[],
): ClassCalendarItem[][] {
  return days.map((day) => classes.filter((item) => isSameCalendarDay(item.start, day)))
}

function groupAssignmentsByDay(
  days: Date[],
  assignments: AssignmentCalendarItem[],
): AssignmentCalendarItem[][] {
  return days.map((day) =>
    assignments.filter((item) => isSameCalendarDay(item.dueAt, day)),
  )
}

export default function SchedulePage() {
  const { language } = useMainLanguage()
  const t = useT()

  const [activeTab, setActiveTab] = useState<ScheduleTab>('classes')
  const [weekStartDate, setWeekStartDate] = useState<Date>(() =>
    startOfWeekMonday(new Date()),
  )

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStartDate, index)),
    [weekStartDate],
  )

  const classItems = useMemo(
    () => buildClassCalendarItems(weekStartDate),
    [weekStartDate],
  )
  const assignmentItems = useMemo(
    () => buildAssignmentCalendarItems(weekStartDate),
    [weekStartDate],
  )

  const classesByDay = useMemo(
    () => groupClassesByDay(weekDays, classItems),
    [weekDays, classItems],
  )
  const assignmentsByDay = useMemo(
    () => groupAssignmentsByDay(weekDays, assignmentItems),
    [weekDays, assignmentItems],
  )

  const moveWeek = (delta: number) => {
    setWeekStartDate((current) => addDays(current, delta * 7))
  }

  const onWeekKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveWeek(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveWeek(1)
    }
  }

  return (
    <div className="space-y-6" tabIndex={0} onKeyDown={onWeekKeyDown}>
      <div>
        <h1 className="my-0 mb-2 text-3xl font-semibold tracking-tight text-foreground">
          {t('schelude.title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {weekTitle(language, weekStartDate)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('schelude.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>{t('schelude.weekCalendar')}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveWeek(-1)}
                aria-label={t('schelude.prevWeek')}
              >
                <ChevronLeft />
                {t('schelude.prevWeek')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveWeek(1)}
                aria-label={t('schelude.nextWeek')}
              >
                {t('schelude.nextWeek')}
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={activeTab === 'classes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('classes')}
            >
              {t('schelude.tabs.classes')}
            </Button>
            <Button
              variant={activeTab === 'assignments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('assignments')}
            >
              {t('schelude.tabs.assignments')}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-7">
            {weekDays.map((day, index) => {
              const classDayItems = classesByDay[index]
              const assignmentDayItems = assignmentsByDay[index]
              const isClassesTab = activeTab === 'classes'
              const hasItems = isClassesTab
                ? classDayItems.length > 0
                : assignmentDayItems.length > 0

              return (
                <section
                  key={day.toISOString()}
                  className="rounded-lg border border-border bg-card"
                >
                  <div className="px-3 py-2">
                    <p className="my-0 text-xs text-muted-foreground">
                      {dayLabel(language, day)}
                    </p>
                    <p className="my-0 text-sm font-medium text-foreground">
                      {formatDisplayDate(language, day, false)}
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-2 p-3">
                    {!hasItems ? (
                      <p className="my-0 text-xs text-muted-foreground">
                        {t('schelude.empty')}
                      </p>
                    ) : isClassesTab ? (
                      classDayItems.map((item) => (
                        <article
                          key={item.title + item.start.toISOString()}
                          className="rounded-md border border-border p-2"
                        >
                          <p className="my-0 text-sm font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatTimeRange(language, item.start, item.end)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t('schelude.labels.location')}: {item.location}
                          </p>
                          <a
                            href={item.remoteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline"
                          >
                            {t('schelude.labels.remoteUrl')}
                          </a>
                        </article>
                      ))
                    ) : (
                      assignmentDayItems.map((item) => (
                        <article
                          key={item.title + item.dueAt.toISOString()}
                          className="rounded-md border border-border p-2"
                        >
                          <p className="my-0 text-sm font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t('schelude.labels.dueAt')}:{' '}
                            {formatDueDateTime(language, item.dueAt)}
                          </p>
                          <a
                            href={item.taskUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline"
                          >
                            {t('schelude.labels.taskUrl')}
                          </a>
                        </article>
                      ))
                    )}
                  </div>
                </section>
              )
            })}
          </div>

          <p className={cn('mt-3 text-xs text-muted-foreground')}>
            {t('schelude.keyboardHint')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
