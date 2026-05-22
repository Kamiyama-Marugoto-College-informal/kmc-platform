import { createMemo, Show, For } from 'solid-js'
import { BookOpen, CalendarDays } from 'lucide-solid'
import { language, tStore } from '~/lib/i18n'
import { formatDisplayDate, formatTimeRange } from '~/lib/utils'
import {
  buildAssignmentItems,
  buildTodayScheduleItems,
  type AssignmentItem,
} from '~/lib/data/mockDashboard'

type DueKind = 'overdue' | 'today' | 'thisWeek' | 'later'

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

function dueKind(dueDate: Date, todayDate: Date): DueKind {
  const d0 = startOfDay(dueDate)
  const t0 = startOfDay(todayDate)
  if (d0.getTime() < t0.getTime()) return 'overdue'
  if (isSameCalendarDay(dueDate, todayDate)) return 'today'
  if (isInSameCalendarWeek(dueDate, todayDate)) return 'thisWeek'
  return 'later'
}

function dueBadgeClass(kind: DueKind): string {
  switch (kind) {
    case 'overdue':
      return 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
    case 'today':
      return 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
    case 'thisWeek':
      return 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
    default:
      return 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
  }
}

export default function DashboardPage() {
  const t = tStore
  const lang = language

  const today = new Date()
  const scheduleItems = createMemo(() => buildTodayScheduleItems(today))
  const assignments = createMemo(() =>
    buildAssignmentItems(today)
      .filter((a) => !a.done)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()),
  )

  return (
    <div class="space-y-6">
      <div>
        <h1 class="my-0 mb-2 text-3xl font-semibold tracking-tight text-foreground">
          {t()('dashboard.title')}
        </h1>
        <p class="mt-1 text-sm text-muted-foreground">
          {formatDisplayDate(lang(), today, true)}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">{t()('dashboard.subtitle')}</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        {/* Schedule Card */}
        <div class="rounded-xl border bg-card text-card-foreground shadow">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="font-semibold leading-none tracking-tight">
              {t()('dashboard.sectionTodaySchedule')}
            </h3>
            <p class="text-sm text-muted-foreground">
              {formatDisplayDate(lang(), today, false)}
            </p>
          </div>
          <div class="p-6 pt-0">
            <Show
              when={scheduleItems().length > 0}
              fallback={
                <div class="flex flex-col items-center justify-center py-4 text-center">
                  <CalendarDays class="h-10 w-10 text-muted-foreground/50" />
                  <p class="mt-2 text-sm font-medium text-muted-foreground">
                    {t()('dashboard.sectionTodaySchedule')}
                  </p>
                  <p class="text-sm text-muted-foreground">{t()('dashboard.scheduleEmpty')}</p>
                </div>
              }
            >
              <div class="flex flex-col" role="list">
                <For each={scheduleItems()}>
                  {(item, index) => (
                    <div role="listitem" class="flex flex-col">
                      <Show when={index() > 0}>
                        <div class="bg-border h-px" />
                      </Show>
                      <div class="py-3">
                        <p class="my-0 font-medium text-foreground">{item.title}</p>
                        <p class="mt-1 text-sm text-muted-foreground">
                          {formatTimeRange(lang(), item.start, item.end)}
                          {item.location ? ` · ${item.location}` : ''}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>

        {/* Assignments Card */}
        <div class="rounded-xl border bg-card text-card-foreground shadow">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="font-semibold leading-none tracking-tight">
              {t()('dashboard.sectionAssignments')}
            </h3>
            <p class="text-sm text-muted-foreground">
              {t()('dashboard.assignmentsCardDescription')}
            </p>
          </div>
          <div class="p-6 pt-0">
            <Show
              when={assignments().length > 0}
              fallback={
                <div class="flex flex-col items-center justify-center py-4 text-center">
                  <BookOpen class="h-10 w-10 text-muted-foreground/50" />
                  <p class="mt-2 text-sm font-medium text-muted-foreground">
                    {t()('dashboard.sectionAssignments')}
                  </p>
                  <p class="text-sm text-muted-foreground">{t()('dashboard.assignmentsEmpty')}</p>
                </div>
              }
            >
              <div class="flex flex-col" role="list">
                <For each={assignments()}>
                  {(a, index) => {
                    const kind = dueKind(a.dueDate, today)
                    const label =
                      kind === 'overdue'
                        ? t()('dashboard.assignmentDue.overdue')
                        : kind === 'today'
                          ? t()('dashboard.assignmentDue.today')
                          : kind === 'thisWeek'
                            ? t()('dashboard.assignmentDue.thisWeek')
                            : t()('dashboard.assignmentDue.later')
                    return (
                      <div role="listitem" class="flex flex-col">
                        <Show when={index() > 0}>
                          <div class="bg-border h-px" />
                        </Show>
                        <div class="flex flex-wrap items-start justify-between gap-2 py-3">
                          <div class="min-w-0 flex-1">
                            <p class="my-0 font-medium text-foreground">{a.title}</p>
                            <Show when={a.course}>
                              {(course) => (
                                <p class="mt-0.5 text-sm text-muted-foreground">{course()}</p>
                              )}
                            </Show>
                            <p class="mt-1 text-xs text-muted-foreground">
                              {formatDisplayDate(lang(), a.dueDate, true)}
                            </p>
                          </div>
                          <span
                            class={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${dueBadgeClass(kind)}`}
                          >
                            {label}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}
