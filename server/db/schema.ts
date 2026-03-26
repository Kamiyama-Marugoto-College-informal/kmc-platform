import { pgTable, index, foreignKey, text, integer, timestamp, unique, boolean, pgEnum } from "drizzle-orm/pg-core"

export const challengeFundCategory = pgEnum("ChallengeFundCategory", ['startup', 'beta', 'contest', 'staff', 'mini_challenge'])
export const challengeFundStatus = pgEnum("ChallengeFundStatus", ['entry', 'review', 'pitch_scheduled', 'in_execution', 'completed', 'rejected'])
export const notificationType = pgEnum("NotificationType", ['status_change', 'pitch_scheduled', 'settlement_approved', 'settlement_rejected', 'budget_alert'])
export const userRole = pgEnum("UserRole", ['admin', 'accountant', 'committee', 'applicant'])


export const budgetItem = pgTable("BudgetItem", {
	id: text().primaryKey().notNull(),
	challengeFundId: text().notNull(),
	name: text().notNull(),
	quantity: integer().default(1).notNull(),
	unitPrice: integer().notNull(),
	totalPrice: integer().notNull(),
	purpose: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("BudgetItem_challengeFundId_idx").using("btree", table.challengeFundId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.challengeFundId],
			foreignColumns: [challengeFund.id],
			name: "BudgetItem_challengeFundId_ChallengeFund_id_fk"
		}).onDelete("cascade"),
]);

export const calendarEvent = pgTable("CalendarEvent", {
	id: text().primaryKey().notNull(),
	challengeFundId: text().notNull(),
	title: text().notNull(),
	startTime: timestamp({ mode: 'string' }).notNull(),
	endTime: timestamp({ mode: 'string' }).notNull(),
	location: text(),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.challengeFundId],
			foreignColumns: [challengeFund.id],
			name: "CalendarEvent_challengeFundId_ChallengeFund_id_fk"
		}).onDelete("cascade"),
]);

export const pitchScore = pgTable("PitchScore", {
	id: text().primaryKey().notNull(),
	challengeFundId: text().notNull(),
	scorerId: text().notNull(),
	innovation: integer().notNull(),
	feasibility: integer().notNull(),
	impact: integer().notNull(),
	presentation: integer().notNull(),
	total: integer().notNull(),
	comment: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("PitchScore_challengeFundId_idx").using("btree", table.challengeFundId.asc().nullsLast().op("text_ops")),
	index("PitchScore_scorerId_idx").using("btree", table.scorerId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.challengeFundId],
			foreignColumns: [challengeFund.id],
			name: "PitchScore_challengeFundId_ChallengeFund_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.scorerId],
			foreignColumns: [user.id],
			name: "PitchScore_scorerId_User_id_fk"
		}).onDelete("cascade"),
]);

export const rateLimit = pgTable("RateLimit", {
	key: text().primaryKey().notNull(),
	count: integer().notNull(),
	lastRequest: integer().notNull(),
});

export const verification = pgTable("Verification", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	identifier: text().notNull(),
}, (table) => [
	index("Verification_expiresAt_idx").using("btree", table.expiresAt.asc().nullsLast().op("timestamp_ops")),
	index("Verification_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const budgetConfig = pgTable("BudgetConfig", {
	id: text().primaryKey().notNull(),
	fiscalYear: integer().notNull(),
	totalBudget: integer().notNull(),
	allocatedBudget: integer().default(0).notNull(),
	remainingBudget: integer().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("BudgetConfig_fiscalYear_unique").on(table.fiscalYear),
]);

export const account = pgTable("Account", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	providerId: text().notNull(),
	accountId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ mode: 'string' }),
	refreshTokenExpiresAt: timestamp({ mode: 'string' }),
	scope: text(),
	password: text(),
}, (table) => [
	index("Account_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Account_userId_User_id_fk"
		}).onDelete("cascade"),
	unique("Account_providerId_accountId_unique").on(table.providerId, table.accountId),
]);

export const session = pgTable("Session", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	userId: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	token: text().notNull(),
	ipAddress: text(),
	userAgent: text(),
}, (table) => [
	index("Session_expiresAt_idx").using("btree", table.expiresAt.asc().nullsLast().op("timestamp_ops")),
	index("Session_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Session_userId_User_id_fk"
		}).onDelete("cascade"),
	unique("Session_token_unique").on(table.token),
]);

export const notification = pgTable("Notification", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	userId: text().notNull(),
	message: text().notNull(),
	read: boolean().default(false).notNull(),
	type: notificationType().notNull(),
	metadata: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("Notification_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Notification_userId_User_id_fk"
		}).onDelete("cascade"),
]);

export const challengeFund = pgTable("ChallengeFund", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	title: text().notNull(),
	summary: text(),
	schedule: text(),
	executionPlan: text(),
	notes: text(),
	category: challengeFundCategory().notNull(),
	status: challengeFundStatus().notNull(),
	amount: integer().notNull(),
	applicantAffiliation: text(),
	budgetDocUrl: text(),
	receiptDocUrl: text(),
	pitchDate: timestamp("pitch_date", { mode: 'string' }),
	settlementVerified: boolean().default(false).notNull(),
	settlementVerifiedBy: text(),
	settlementVerifiedAt: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "ChallengeFund_userId_User_id_fk"
		}).onDelete("cascade"),
]);

export const user = pgTable("User", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	email: text().notNull(),
	emailVerified: boolean().default(false).notNull(),
	name: text().notNull(),
	image: text(),
	role: userRole().default('applicant').notNull(),
	affiliations: text(),
	nickname: text(),
	birthDate: text(),
	skillTags: text(),
	snsLinks: text(),
}, (table) => [
	unique("User_email_unique").on(table.email),
]);
