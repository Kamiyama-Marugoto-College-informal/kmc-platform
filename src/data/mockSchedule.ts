export interface ClassCalendarItem {
  title: string
  location: string
  remoteUrl: string
  start: Date
  end: Date
}

export interface AssignmentCalendarItem {
  title: string
  dueAt: Date
  taskUrl: string
}

type ClassSeed = {
  weekOffset: number
  dayOffset: number
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  title: string
  location: string
  remoteUrl: string
}

type AssignmentSeed = {
  weekOffset: number
  dayOffset: number
  dueHour: number
  dueMinute: number
  title: string
  taskUrl: string
}

const classSeeds: ClassSeed[] = [
  {
    weekOffset: 0,
    dayOffset: 0,
    startHour: 9,
    startMinute: 0,
    endHour: 10,
    endMinute: 30,
    title: '線形代数',
    location: 'A301',
    remoteUrl: 'https://meet.example.com/linear-algebra',
  },
  {
    weekOffset: 0,
    dayOffset: 1,
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 30,
    title: 'データ構造',
    location: 'B204',
    remoteUrl: 'https://meet.example.com/data-structures',
  },
  {
    weekOffset: 0,
    dayOffset: 3,
    startHour: 10,
    startMinute: 40,
    endHour: 12,
    endMinute: 10,
    title: '統計学',
    location: 'C102',
    remoteUrl: 'https://meet.example.com/statistics',
  },
  {
    weekOffset: 0,
    dayOffset: 4,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    title: '英語コミュニケーション',
    location: '語学棟 2F',
    remoteUrl: 'https://meet.example.com/english-comm',
  },
  {
    weekOffset: 1,
    dayOffset: 2,
    startHour: 9,
    startMinute: 0,
    endHour: 10,
    endMinute: 30,
    title: 'アルゴリズム',
    location: '情報演習室1',
    remoteUrl: 'https://meet.example.com/algorithms',
  },
]

const extraClassTemplates: Array<{
  title: string
  location: string
  remoteUrl: string
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}> = [
  {
    title: '経済学入門',
    location: 'D101',
    remoteUrl: 'https://meet.example.com/economics',
    startHour: 10,
    startMinute: 40,
    endHour: 12,
    endMinute: 10,
  },
  {
    title: '情報倫理',
    location: 'E203',
    remoteUrl: 'https://meet.example.com/info-ethics',
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 30,
  },
  {
    title: '基礎生物学',
    location: '理学棟 1F',
    remoteUrl: 'https://meet.example.com/biology',
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
  },
  {
    title: '日本語表現法',
    location: '文科棟 3F',
    remoteUrl: 'https://meet.example.com/japanese-writing',
    startHour: 17,
    startMinute: 0,
    endHour: 18,
    endMinute: 30,
  },
]

const assignmentSeeds: AssignmentSeed[] = [
  {
    weekOffset: 0,
    dayOffset: 0,
    dueHour: 23,
    dueMinute: 59,
    title: '物理学レポート第3回',
    taskUrl: 'https://lms.example.com/tasks/physics-3',
  },
  {
    weekOffset: 0,
    dayOffset: 2,
    dueHour: 18,
    dueMinute: 0,
    title: 'プログラミング演習 課題5',
    taskUrl: 'https://lms.example.com/tasks/programming-5',
  },
  {
    weekOffset: 0,
    dayOffset: 4,
    dueHour: 12,
    dueMinute: 0,
    title: '英語プレゼン資料提出',
    taskUrl: 'https://lms.example.com/tasks/english-presentation',
  },
  {
    weekOffset: 1,
    dayOffset: 1,
    dueHour: 17,
    dueMinute: 30,
    title: 'データベース小テスト',
    taskUrl: 'https://lms.example.com/tasks/db-quiz',
  },
]

function addDays(reference: Date, days: number): Date {
  const d = new Date(reference)
  d.setDate(d.getDate() + days)
  return d
}

function atTime(reference: Date, hour: number, minute: number): Date {
  const d = new Date(reference)
  d.setHours(hour, minute, 0, 0)
  return d
}

function buildExtraClassSeedsForWeek(weekStartDate: Date): ClassSeed[] {
  const weekKey = Math.floor(weekStartDate.getTime() / (24 * 60 * 60 * 1000))
  const targetDay = Math.abs(weekKey) % 7

  const baseCount = classSeeds.filter(
    (seed) => seed.weekOffset === 0 && seed.dayOffset === targetDay,
  ).length

  const remaining = Math.max(0, 4 - baseCount)
  if (remaining === 0) {
    return []
  }

  const additionalCount = Math.min(remaining, 1 + (Math.abs(weekKey) % remaining))
  const startIndex = Math.abs(weekKey * 3) % extraClassTemplates.length

  return Array.from({ length: additionalCount }, (_, index) => {
    const template = extraClassTemplates[
      (startIndex + index) % extraClassTemplates.length
    ]
    return {
      weekOffset: 0,
      dayOffset: targetDay,
      startHour: template.startHour,
      startMinute: template.startMinute,
      endHour: template.endHour,
      endMinute: template.endMinute,
      title: template.title,
      location: template.location,
      remoteUrl: template.remoteUrl,
    }
  })
}

export function buildClassCalendarItems(
  weekStartDate: Date,
): ClassCalendarItem[] {
  const seeds = [...classSeeds, ...buildExtraClassSeedsForWeek(weekStartDate)]
  return seeds.map((seed) => {
    const base = addDays(weekStartDate, seed.weekOffset * 7 + seed.dayOffset)
    return {
      title: seed.title,
      location: seed.location,
      remoteUrl: seed.remoteUrl,
      start: atTime(base, seed.startHour, seed.startMinute),
      end: atTime(base, seed.endHour, seed.endMinute),
    }
  })
}

export function buildAssignmentCalendarItems(
  weekStartDate: Date,
): AssignmentCalendarItem[] {
  return assignmentSeeds.map((seed) => {
    const base = addDays(weekStartDate, seed.weekOffset * 7 + seed.dayOffset)
    return {
      title: seed.title,
      taskUrl: seed.taskUrl,
      dueAt: atTime(base, seed.dueHour, seed.dueMinute),
    }
  })
}
