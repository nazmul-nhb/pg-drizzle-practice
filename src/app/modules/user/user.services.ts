import { db } from '#/drizzle';
import { users } from '#/drizzle/schema/users';
import type { TPlainUser } from '@/modules/user/user.types';
import { userCols } from '@/modules/user/user.utils';
import type { TQueries } from '@/types';
import { eq, ilike, or, type SQL } from 'drizzle-orm';
import { convertObjectValues, isValidObject, pickFields, sanitizeData } from 'nhb-toolbox';
import type { GenericObject } from 'nhb-toolbox/object/types';

export function extractKeys<T extends GenericObject>(obj: T): Array<keyof T> {
	return Object.keys(obj);
}

class UserServices {
	async getAllUsersFromDB(query?: TQueries<TPlainUser>) {
		const queries = pickFields(
			convertObjectValues(query!, { keys: ['id'], convertTo: 'number' }),
			['id', 'first_name', 'last_name', 'email', 'role', 'user_name']
		);

		const filters: SQL[] =
			isValidObject(query) ?
				Object.entries(sanitizeData(queries, { ignoreNullish: true })).map(
					([key, value]) => {
						if (typeof value === 'string') {
							return ilike(users[key as keyof TPlainUser], `%${value}%`);
						}
						return eq(users[key as 'id'], value!);
					}
				)
			:	[];

		const result = await db
			.select(userCols)
			.from(users)
			.orderBy(users.id)
			.where(or(...filters));

		// const {
		// 	_sum: { id: sum },
		// } = await prisma.user.aggregate({
		// 	_sum: {
		// 		id: true,
		// 	},
		// });

		// console.log(sum);

		return result;
	}

	// async getCurrentUserFromDB(email: TEmail | undefined) {
	// 	const user = await User.validateUser(email);

	// 	const { password: _, __v, ...userInfo } = user.toObject<IPlainUser>();

	// 	return userInfo;
	// }
}

export const userServices = new UserServices();
