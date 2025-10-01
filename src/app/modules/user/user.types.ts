import type { TEmail, TUserRole } from '@/types';

export interface IUser extends ILoginCredentials {
	first_name: string;
	last_name: string;
	role: TUserRole;
	user_name: string;
	is_active: boolean;
}

export interface ILoginCredentials {
	email: TEmail;
	password: string;
}

export interface ITokens {
	access_token: string;
	refresh_token: string;
	user: ICurrentUser;
}

export interface IPlainUser extends IUser {
	created_at: string;
	updated_at: string;
}

export interface IUserDoc extends IPlainUser {}

export interface ICurrentUser extends Omit<IUser, 'password'> {
	created_at: string;
	updated_at: string;
}
