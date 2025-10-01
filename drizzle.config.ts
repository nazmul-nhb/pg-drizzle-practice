import { defineConfig } from 'drizzle-kit';
import configs from './src/app/configs';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/drizzle/schema/*',
	out: './src/drizzle/migrations',
	dbCredentials: {
		url: configs.databaseUrl,
	},
	migrations: {
		schema: 'public',
	},
	introspect: {
		casing: 'preserve',
	},
	verbose: true,
	strict: true,
});
