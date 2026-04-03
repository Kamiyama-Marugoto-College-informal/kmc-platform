import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core';

export const profileRoleEnum = pgEnum('profile_role', [
  'admin',
  'student',
  'staff',
])

export const Profiles = pgTable('profiles', {
  id: text('id').primaryKey(), // auth.users.id と対応
  role: profileRoleEnum('role').notNull().default('student'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
