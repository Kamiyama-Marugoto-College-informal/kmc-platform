import { createSignal, createMemo, Show, For } from 'solid-js'
import { ChevronLeft, ChevronRight } from 'lucide-solid'
import { Tabs } from '@kobalte/core/tabs'
import { language, tStore } from '~/lib/i18n'
import { formatDisplayDate, formatTimeRange } from '~/lib/utils'
import {
  buildAssignmentCalendarItems,
  buildClassCalendarItems,
} from '~/lib/data/mockSchedule'
import { cn } from '~/lib/utils'

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

export default function SchedulePage() {
  const t = tStore
  const lang = language

  const [activeTab, setActiveTab] = createSignal<ScheduleTab>('classes')
  const [weekStartDate, setWeekStartDate] = createSignal<Date>(
    startOfWeekMonday(new Date()),
  )

  const weekDays = createMemo(() =>
    Array.from({ length: 7 }, (_, index) => addDays(weekStartDate(), index)),
  )
  const classItems = createMemo(() => buildClassCalendarItems(weekStartDate()))
  const assignmentItems = createMemo(() =>
    buildAssignmentCalendarItems(weekStartDate()),
  )

  const classesByDay = createMemo(() =>
    weekDays().map((day) =>
      classItems().filter((item) => isSameCalendarDay(item.start, day)),
    ),
  )
  const assignmentsByDay = createMemo(() =>
    weekDays().map((day) =>
      assignmentItems().filter((item) => isSameCalendarDay(item.dueAt, day)),
    ),
  )

  function formatDueDateTime(date: Date): string {
    return new Intl.DateTimeFormat(lang() === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  function dayLabel(date: Date): string {
    return new Intl.DateTimeFormat(lang() === 'ja' ? 'ja-JP' : 'en-US', {
      weekday: 'short',
    }).format(date)
  }

  function weekTitle(): string {
    const weekStart = weekStartDate()
    const weekEnd = addDays(weekStart, 6)
    return `${formatDisplayDate(lang(), weekStart, false)} - ${formatDisplayDate(lang(), weekEnd, false)}`
  }

  function moveWeek(delta: number) {
    setWeekStartDate((prev) => addDays(prev, delta * 7))
  }

  function onWeekKeyDown(event: KeyboardEvent) {
    // Let Kobalte Tabs handle arrow keys when focused inside the tab list
    if ((event.target as HTMLElement).closest('[role="tablist"]')) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveWeek(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveWeek(1)
    }
  }

  return (
    <div
      class="space-y-6"
      tabIndex={0}
      role="application"
      onKeyDown={onWeekKeyDown}
    >
      <div>
        <h1 class="my-0 mb-2 text-3xl font-semibold tracking-tight text-foreground">
          {t()('schelude.title')}
        </h1>
        <p class="mt-1 text-sm text-muted-foreground">{weekTitle()}</p>
        <p class="mt-1 text-sm text-muted-foreground">
          {t()('schelude.subtitle')}
        </p>
      </div>

      <div class="rounded-xl border bg-card text-card-foreground shadow">
        <div class="flex flex-col space-y-1.5 p-6 gap-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="font-semibold leading-none tracking-tight">
              {t()('schelude.weekCalendar')}
            </h3>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => moveWeek(-1)}
                aria-label={t()('schelude.prevWeek')}
              >
                <ChevronLeft class="h-4 w-4" />
                {t()('schelude.prevWeek')}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => moveWeek(1)}
                aria-label={t()('schelude.nextWeek')}
              >
                {t()('schelude.nextWeek')}
                <ChevronRight class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <Tabs
              value={activeTab()}
              onChange={(v) => setActiveTab(v as ScheduleTab)}
            >
              <Tabs.List class="flex flex-wrap items-center gap-2">
                <Tabs.Trigger
                  value="classes"
                  class={cn(
                    'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                    'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-primary data-[selected]:hover:bg-primary/90',
                  )}
                >
                  {t()('schelude.tabs.classes')}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="assignments"
                  class={cn(
                    'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                    'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-primary data-[selected]:hover:bg-primary/90',
                  )}
                >
                  {t()('schelude.tabs.assignments')}
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </div>
        </div>

        <div class="p-6 pt-0">
          <div class="grid gap-3 md:grid-cols-7">
            <For each={weekDays()}>
              {(day, index) => {
                const classDayItems = () => classesByDay()[index()]
                const assignmentDayItems = () => assignmentsByDay()[index()]
                const hasItems = () =>
                  activeTab() === 'classes'
                    ? classDayItems().length > 0
                    : assignmentDayItems().length > 0

                return (
                  <section class="rounded-lg border border-border bg-card">
                    <div class="px-3 py-2">
                      <p class="my-0 text-xs text-muted-foreground">
                        {dayLabel(day)}
                      </p>
                      <p class="my-0 text-sm font-medium text-foreground">
                        {formatDisplayDate(lang(), day, false)}
                      </p>
                    </div>
                    <div class="bg-border h-px" />

                    <div class="space-y-2 p-3">
                      <Show
                        when={hasItems()}
                        fallback={
                          <p class="my-0 text-xs text-muted-foreground">
                            {t()('schelude.empty')}
                          </p>
                        }
                      >
                        <Show when={activeTab() === 'classes'}>
                          <For each={classDayItems()}>
                            {(item) => (
                              <article class="rounded-md border border-border p-2">
                                <p class="my-0 text-sm font-medium text-foreground">
                                  {item.title}
                                </p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                  {formatTimeRange(
                                    lang(),
                                    item.start,
                                    item.end,
                                  )}
                                </p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                  {t()('schelude.labels.location')}:{' '}
                                  {item.location}
                                </p>
                                <a
                                  href={item.remoteUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  class="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline"
                                >
                                  {t()('schelude.labels.remoteUrl')}
                                </a>
                              </article>
                            )}
                          </For>
                        </Show>
                        <Show when={activeTab() === 'assignments'}>
                          <For each={assignmentDayItems()}>
                            {(item) => (
                              <article class="rounded-md border border-border p-2">
                                <p class="my-0 text-sm font-medium text-foreground">
                                  {item.title}
                                </p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                  {t()('schelude.labels.dueAt')}:{' '}
                                  {formatDueDateTime(item.dueAt)}
                                </p>
                                <a
                                  href={item.taskUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  class="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline"
                                >
                                  {t()('schelude.labels.taskUrl')}
                                </a>
                              </article>
                            )}
                          </For>
                        </Show>
                      </Show>
                    </div>
                  </section>
                )
              }}
            </For>
          </div>

          <p class="mt-3 text-xs text-muted-foreground">
            {t()('schelude.keyboardHint')}
          </p>
        </div>
      </div>
    </div>
  )
}
