export const en = {
  common: {
    loading: 'Loading...',
    welcome: 'Welcome, {name}',
  },
  auth: {
    signOut: 'Sign out',
  },
  language: {
    main: 'Main language',
    description:
      'Choose your display language. The selection is saved in your browser.',
    japanese: 'Japanese',
    english: 'English',
  },
  profile: {
    settings: {
      title: 'Profile settings',
      intro: 'Change how your name appears and how you receive notifications.',
    },
  },
  dashboard: {
    title: 'Overview',
    subtitle: "See today's schedule and assignment deadlines at a glance.",
    sectionTodaySchedule: "Today's schedule",
    sectionAssignments: 'Assignments',
    assignmentsCardDescription:
      'Incomplete assignments sorted by nearest due date.',
    scheduleEmpty: 'No events scheduled for today.',
    assignmentsEmpty: 'No assignments to show.',
    assignmentDue: {
      overdue: 'Overdue',
      today: 'Today',
      thisWeek: 'This week',
      later: 'Later',
    },
  },
  schelude: {
    title: 'Schedule',
    subtitle: 'Review classes and assignment deadlines by week.',
    weekCalendar: 'Weekly calendar',
    prevWeek: 'Previous week',
    nextWeek: 'Next week',
    tabs: {
      classes: 'Classes',
      assignments: 'Assignments',
    },
    labels: {
      location: 'Location',
      remoteUrl: 'Remote URL',
      dueAt: 'Due',
      taskUrl: 'Task URL',
    },
    empty: 'No items for this day.',
    keyboardHint:
      'Tip: Focus the calendar and use Left/Right arrow keys to change weeks.',
  },
  footer: {
    copyright: '© {year} KMC Platform',
    terms: 'Terms',
    privacy: 'Privacy',
  },
} as const
