import type { hellos } from '#/drizzle/schema/hellos';

export type InsertHello = typeof hellos.$inferInsert;

export type THello = typeof hellos.$inferSelect;
