import type { IParserError } from '@/types/interfaces';
import { isObject, isString } from 'nhb-toolbox';

class ErrorGuard {
	/** * Type guard to check if an error is an Express Body Parser Error. */
	isParserError(error: unknown): error is IParserError {
		return (
			isObject(error) &&
			'type' in error &&
			isString(error.type) &&
			error.type === 'entity.parse.failed'
		);
	}
}

export const errorGuard = new ErrorGuard();
