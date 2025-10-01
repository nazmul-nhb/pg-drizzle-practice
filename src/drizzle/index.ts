import configs from '@/configs';
import { drizzle } from 'drizzle-orm/postgres-js';

export const db = drizzle(configs.databaseUrl);
