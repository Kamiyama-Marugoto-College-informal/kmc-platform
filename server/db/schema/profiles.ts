import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { profileRoleEnum } from './enums'

export const Profiles = pgTable('profiles', {
  id: text('id').primaryKey(), // auth.users.id と対応
  role: profileRoleEnum('role').notNull().default('student'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

