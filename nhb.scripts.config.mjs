// @ts-check

import { cpSync } from 'fs';
import { defineScriptConfig, updateCollection, updateRoutes } from 'nhb-scripts';
import { Stylog } from 'nhb-toolbox/stylog';
import { createDrizzlePostgresSchema } from './scripts/createSchema.mjs';
import { expressDrizzlePostgresTemplate } from './scripts/moduleTemplate.mjs';
import { updateDrizzleInstance } from './scripts/updateDrizzle.mjs';

export default defineScriptConfig({
	format: {
		args: ['--write'],
		files: ['src', 'nhb.scripts.config.mjs', 'eslint.config.mjs', 'drizzle.config.ts'],
		ignorePath: '.prettierignore',
	},
	lint: { folders: ['src'], patterns: ['**/*.ts'] },
	fix: { folders: ['src'], patterns: ['**/*.ts'] },
	commit: {
		runFormatter: true,
		emojiBeforePrefix: true,
		wrapPrefixWith: '`',
	},
	build: {
		distFolder: 'dist',
		commands: [{ cmd: 'tsc' }, { cmd: 'tsc-alias' }],
		after: [copyFolder],
	},
	count: {
		defaultPath: 'src',
		excludePaths: ['node_modules', 'dist'],
	},
	module: {
		force: false,
		destination: 'src/app/modules',
		defaultTemplate: 'express-drizzle-postgres',
		templates: {
			'express-drizzle-postgres': {
				createFolder: true,
				destination: 'src/app/modules',
				files: expressDrizzlePostgresTemplate,
				onComplete: (moduleName) => {
					updateCollection(moduleName);
					updateRoutes(moduleName, true);
				},
			},
			'drizzle-postgres-schema': {
				createFolder: false,
				destination: 'src/drizzle/schema',
				files: createDrizzlePostgresSchema,
				onComplete: (schemaName) => {
					updateDrizzleInstance(schemaName);
				},
			},
		},
	},
});

/**
 *  * Copies the contents of one folder to another.
 *
 * @param {string} srcDir Path of the source folder. Defaults to `src/public`
 * @param {string} destDir Path of the destination folder. Defaults to `dist/public`
 */
function copyFolder(srcDir = 'src/public', destDir = 'dist/public') {
	const ansiColor = Stylog.ansi16;
	const bgGray = Stylog.ansi16('bgBlackBright').toANSI;

	try {
		cpSync(srcDir, destDir, { recursive: true });
		console.info(
			ansiColor('blackBright').toANSI('│\n') +
				ansiColor('greenBright').toANSI(
					`◇  ✅ Contents from ${bgGray(` ${srcDir} `)} copied to ${bgGray(` ${destDir} `)} successfully!`
				)
		);
	} catch (err) {
		console.error(ansiColor('redBright').toANSI(`🛑 Error copying folder: ${err}`));
		process.exit(0);
	}
}
