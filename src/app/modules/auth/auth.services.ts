import { db } from '#/drizzle';
import { users } from '#/drizzle/schema/users';
import type { InsertUser } from '@/modules/user/user.types';
import { omitFields } from 'nhb-toolbox';

class AuthServices {
	async registerUserInDB(payload: InsertUser) {
		const user = await db.insert(users).values(payload).returning();

		return omitFields(user[0], ['password']);
	}

	// /**
	//  * * Login user.
	//  * @param payload Login credentials (`email` and `password`).
	//  * @returns Token as object.
	//  */
	// async loginUser(payload: ILoginCredentials): Promise<ITokens> {
	// 	// * Validate and extract user from DB.
	// 	const user = await User.validateUser(payload.email);

	// 	const result = await processLogin(payload?.password, user);

	// 	return result;
	// }

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

	// /** * Get current user from DB. */
	// async getCurrentUserFromDB(client?: DecodedUser) {
	// 	const user = await User.validateUser(client?.email);

	// 	const { password: _, __v, ...userInfo } = user.toObject<IPlainUser>();

	// 	return userInfo;
	// }
}

export const authServices = new AuthServices();
