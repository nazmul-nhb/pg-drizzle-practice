import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: serial().primaryKey(),
	name: varchar('name', { length: 64 }).notNull(),
});

export type InsertUser = Omit<typeof users.$inferInsert, 'id'>;

export type User = typeof users.$inferSelect;
