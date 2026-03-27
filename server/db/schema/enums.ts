import { pgEnum } from 'drizzle-orm/pg-core'

export const profileRoleEnum = pgEnum('profile_role', [
  'admin',
  'student',
  'staff',
])
