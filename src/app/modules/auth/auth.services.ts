import { db } from '#/drizzle';
import { users } from '#/drizzle/schema/users';
import { processLogin } from '@/modules/auth/auth.utils';
import type { InsertUser, TLoginCredentials } from '@/modules/user/user.types';
import { findUserByEmail, userCols } from '@/modules/user/user.utils';
import type { DecodedUser } from '@/types/interfaces';
import { hashPassword } from '@/utilities/authUtilities';

class AuthServices {
	async registerUserInDB(payload: InsertUser) {
		const hashedPass = await hashPassword(payload.password);

		const user = await db
			.insert(users)
			.values({ ...payload, password: hashedPass })
			.returning(userCols);

		return user[0];
	}

	/**
	 * * Login user.
	 * @param payload Login credentials (`email` and `password`).
	 * @returns Token as object.
	 */
	async loginUser(payload: TLoginCredentials) {
		// * Validate and extract user from DB.
		const user = await findUserByEmail(payload.email, true);

		const result = await processLogin(payload?.password, user);

		return result;
	}

	// /**
	//  * Refresh token.
	//  * @param token Refresh token from client.
	//  * @returns New access token.
	//  */
	// async refreshToken(token: string): Promise<{ token: string }> {
	// 	// * Verify and decode token
	// 	const decodedToken = verifyToken(configs.refreshSecret, token);

	// 	// * Validate and extract user from DB.
	// 	const user = await User.validateUser(decodedToken.email);

	// 	// * Create token and send to the client.
	// 	const accessToken = generateToken(
	// 		pickFields(user, ['email', 'role']),
	// 		configs.accessSecret,
	// 		configs.accessExpireTime
	// 	);

	// 	return { token: accessToken };
	// }

	/**
	 * * Get the current logged-in user's info from DB.
	 * @param email User details from decoded JWT token.
	 * @returns The user details without the password field.
	 */
	async getCurrentUserFromDB(client: DecodedUser | undefined) {
		const user = await findUserByEmail(client?.email);

		return user;
	}
}

export const authServices = new AuthServices();
