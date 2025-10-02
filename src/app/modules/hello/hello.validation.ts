import { hellos } from '#/drizzle/schema/hellos';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const creationSchema = z.object({}).strict();

const updateSchema = creationSchema.partial();

/** Convert drizzle table schema to Zod schema */
const drizzleSchema = createInsertSchema(hellos);

export const helloValidations = { creationSchema, drizzleSchema, updateSchema };
