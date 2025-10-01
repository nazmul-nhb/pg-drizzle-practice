import type { TEmail, TUserRole } from '@/types';
import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { generateRandomID } from 'nhb-toolbox';

export const users = pgTable('users', {
	id: serial().primaryKey(),
	first_name: varchar({ length: 64 }).notNull(),
	last_name: varchar({ length: 64 }).notNull(),
	email: varchar({ length: 128 }).$type<TEmail>().notNull(),
	password: varchar({ length: 64 }).notNull(),
	role: varchar({ length: 16 }).notNull().$type<TUserRole>().default('user'),
	is_active: boolean().notNull().default(true),
	user_name: varchar({ length: 32 })
		.notNull()
		.unique()
		.$default(() => `guest_${generateRandomID({ length: 6 })}`),
	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp().defaultNow().notNull(),
});
