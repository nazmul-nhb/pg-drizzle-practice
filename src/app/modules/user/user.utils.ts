import { db } from '#/drizzle';
import { users } from '#/drizzle/schema/users';
import { ErrorWithStatus } from '@/errors/ErrorWithStatus';
import type { TPlainUser, TUser } from '@/modules/user/user.types';
import type { TEmail } from '@/types';
import { eq, getTableColumns } from 'drizzle-orm';
import { STATUS_CODES } from 'nhb-toolbox/constants';

export const { password, ...userCols } = getTableColumns(users);

export async function findUserByEmail<Pass extends boolean = false>(
	email: TEmail,
	withPassword?: Pass
): Promise<Pass extends true ? TUser : TPlainUser> {
	const user = await db
		.select({ ...userCols, ...(withPassword && { password }) })
		.from(users)
		.where(eq(users.email, email));

	if (!user[0]) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`User with email ${email} not found!`,
			STATUS_CODES.NOT_FOUND,
			'email'
		);
	}

	return user[0] as Pass extends true ? TUser : TPlainUser;
}
