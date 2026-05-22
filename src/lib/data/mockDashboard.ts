export interface TodayScheduleItem {
	title: string
	start: Date
	end: Date
	location?: string
}

export interface AssignmentItem {
	title: string
	course?: string
	/** Calendar date (time ignored for due semantics). */
	dueDate: Date
	done?: boolean
}

/** Time-of-day slots merged with `reference` date for "today". */
const mockScheduleTimeSlots: Array<{
	startHour: number
	startMinute: number
	endHour: number
	endMinute: number
	title: string
	location?: string
}> = [
	{
		startHour: 9,
		startMinute: 0,
		endHour: 10,
		endMinute: 30,
		title: '線形代数',
		location: 'A301',
	},
	{
		startHour: 13,
		startMinute: 0,
		endHour: 14,
		endMinute: 30,
		title: 'プログラミング演習',
		location: '情報演習室2',
	},
	{
		startHour: 15,
		startMinute: 30,
		endHour: 17,
		endMinute: 0,
		title: 'サークルミーティング',
		location: '学生ホール',
	},
]

/** Offsets in days from `reference` (0 = due today; negative = overdue). */
const mockAssignmentSeeds: Array<{
	title: string
	course?: string
	dueOffsetDays: number
	done?: boolean
}> = [
	{
		title: '第5回レポート提出',
		course: '物理学概論',
		dueOffsetDays: -2,
		done: false,
	},
	{
		title: '中間課題（プログラム）',
		course: 'アルゴリズム',
		dueOffsetDays: 0,
		done: false,
	},
	{ title: '読書感想文', course: '国語II', dueOffsetDays: 2, done: false },
	{
		title: 'グループ発表スライド',
		course: '英語コミュニケーション',
		dueOffsetDays: 5,
		done: false,
	},
	{
		title: '期末レポート仮稿',
		course: '社会学入門',
		dueOffsetDays: 12,
		done: false,
	},
]

function atTime(reference: Date, hour: number, minute: number): Date {
	const d = new Date(reference)
	d.setHours(hour, minute, 0, 0)
	return d
}

export function buildTodayScheduleItems(reference: Date): TodayScheduleItem[] {
	return mockScheduleTimeSlots.map((slot) => ({
		title: slot.title,
		location: slot.location,
		start: atTime(reference, slot.startHour, slot.startMinute),
		end: atTime(reference, slot.endHour, slot.endMinute),
	}))
}

function addCalendarDays(reference: Date, days: number): Date {
	const d = new Date(reference)
	d.setDate(d.getDate() + days)
	d.setHours(0, 0, 0, 0)
	return d
}

export function buildAssignmentItems(reference: Date): AssignmentItem[] {
	return mockAssignmentSeeds.map((seed) => ({
		title: seed.title,
		course: seed.course,
		dueDate: addCalendarDays(reference, seed.dueOffsetDays),
		done: seed.done ?? false,
	}))
}
