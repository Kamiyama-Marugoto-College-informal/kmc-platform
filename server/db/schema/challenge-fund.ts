import { date, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core';

export const challengeFundStatusEnum = pgEnum('challenge_fund_status', [
  'pending',
  'active',
  'completed',
])

export const ChallengeFundCategory = pgEnum('challenge_fund_category', [
  'startup',
  'beta',
  'contest',
  'mini',
  'staff',
])

export const ChallengeFunds = pgTable('challenge_funds', {
  id: text('id').primaryKey(),
  member: text('member'),
  status: challengeFundStatusEnum('status'),
  category: ChallengeFundCategory('category'),
})

export const ChallengeFundsPitch = pgTable('challenge_funds_pitch', {
  id: text('id').primaryKey(),
  challengeFundId: text('challenge_fund_id').references(() => ChallengeFunds.id),
  date: date('date'),
  createdAt: timestamp('created_at').defaultNow(),
})
