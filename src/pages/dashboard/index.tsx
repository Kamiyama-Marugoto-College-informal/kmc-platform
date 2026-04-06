import { useMemo } from 'react'
import { BookOpen, CalendarDays } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useMainLanguage } from '@/context/MainLanguageContext'
import {
  buildAssignmentItems,
  buildTodayScheduleItems,
  type AssignmentItem,
} from '@/data/mockDashboard'
import {
  formatWelcome,
  mainLanguageMessages,
  type MainLanguage,
} from '@/lib/mainLanguage'

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime()
}

function startOfWeekMonday(reference: Date): Date {
  const d = startOfDay(reference)
  const day = d.getDay()
  const offset = day === 0 ? -6 : 1 - day
  const m = new Date(d)
  m.setDate(d.getDate() + offset)
  return m
}

function isInSameCalendarWeek(date: Date, reference: Date): boolean {
  const weekStart = startOfWeekMonday(reference).getTime()
  const weekEnd = weekStart + 7 * 24 * 60 * 60 * 1000
  const t = startOfDay(date).getTime()
  return t >= weekStart && t < weekEnd
}

function formatDisplayDate(
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

function formatTimeRange(
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

type DueKind = 'overdue' | 'today' | 'thisWeek' | 'later'

function dueKind(dueDate: Date, today: Date): DueKind {
  const d0 = startOfDay(dueDate)
  const t0 = startOfDay(today)
  if (d0.getTime() < t0.getTime()) return 'overdue'
  if (isSameCalendarDay(dueDate, today)) return 'today'
  if (isInSameCalendarWeek(dueDate, today)) return 'thisWeek'
  return 'later'
}

function dueBadgeVariant(kind: DueKind) {
  switch (kind) {
    case 'overdue':
      return 'destructive' as const
    case 'today':
      return 'default' as const
    case 'thisWeek':
      return 'secondary' as const
    default:
      return 'outline' as const
  }
}

export function DashboardPage() {
  const { user } = useAuth()
  const { language } = useMainLanguage()
  const msg = mainLanguageMessages[language]

  const today = useMemo(() => new Date(), [])

  const scheduleItems = useMemo(() => buildTodayScheduleItems(today), [today])

  const assignments = useMemo(() => {
    const raw = buildAssignmentItems(today)
    const visible = raw.filter((a) => !a.done)
    return [...visible].sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
    )
  }, [today])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="my-0 mb-2 text-2xl font-semibold tracking-tight text-foreground">
          {msg.dashboardTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDisplayDate(language, today, true)}
        </p>
        {user ? (
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatWelcome(language, user.name)}
          </p>
        ) : null}
        <p className="mt-1 text-sm text-muted-foreground">
          {msg.dashboardSubtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{msg.sectionTodaySchedule}</CardTitle>
            <CardDescription>
              {formatDisplayDate(language, today, false)}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {scheduleItems.length === 0 ? (
              <Empty className="min-h-0 flex-none border-0 bg-transparent py-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CalendarDays aria-hidden />
                  </EmptyMedia>
                  <EmptyTitle className="text-muted-foreground">
                    {msg.sectionTodaySchedule}
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyDescription>{msg.scheduleEmpty}</EmptyDescription>
              </Empty>
            ) : (
              <div className="flex flex-col" role="list">
                {scheduleItems.map((item, index) => (
                  <div
                    key={item.title + item.start.toISOString()}
                    role="listitem"
                    className="flex flex-col"
                  >
                    {index > 0 ? <Separator /> : null}
                    <div className="py-3">
                      <p className="my-0 font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatTimeRange(language, item.start, item.end)}
                        {item.location ? ` · ${item.location}` : null}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{msg.sectionAssignments}</CardTitle>
            <CardDescription>{msg.assignmentsCardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {assignments.length === 0 ? (
              <Empty className="min-h-0 flex-none border-0 bg-transparent py-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BookOpen aria-hidden />
                  </EmptyMedia>
                  <EmptyTitle className="text-muted-foreground">
                    {msg.sectionAssignments}
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyDescription>{msg.assignmentsEmpty}</EmptyDescription>
              </Empty>
            ) : (
              <div className="flex flex-col" role="list">
                {assignments.map((a: AssignmentItem, index) => {
                  const kind = dueKind(a.dueDate, today)
                  let label: string
                  switch (kind) {
                    case 'overdue':
                      label = msg.assignmentDueOverdue
                      break
                    case 'today':
                      label = msg.assignmentDueToday
                      break
                    case 'thisWeek':
                      label = msg.assignmentDueThisWeek
                      break
                    default:
                      label = msg.assignmentDueLater
                  }
                  return (
                    <div
                      key={a.title + a.dueDate.toISOString()}
                      role="listitem"
                      className="flex flex-col"
                    >
                      {index > 0 ? <Separator /> : null}
                      <div className="flex flex-wrap items-start justify-between gap-2 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="my-0 font-medium text-foreground">
                            {a.title}
                          </p>
                          {a.course ? (
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {a.course}
                            </p>
                          ) : null}
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDisplayDate(language, a.dueDate, true)}
                          </p>
                        </div>
                        <Badge
                          variant={dueBadgeVariant(kind)}
                          className="shrink-0"
                        >
                          {label}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
