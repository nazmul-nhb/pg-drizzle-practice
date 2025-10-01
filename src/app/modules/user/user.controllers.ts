import { userServices } from '@/modules/user/user.services';
import catchAsync from '@/utilities/catchAsync';
import sendResponse from '@/utilities/sendResponse';

class UserControllers {
	getAllUsers = catchAsync(async (req, res) => {
		const users = await userServices.getAllUsersFromDB(req.query);

		sendResponse(res, 'User', 'GET', users);
	});

	// /** * Get current logged in user. */
	// getCurrentUser = catchAsync(async (req, res) => {
	// 	const user = await userServices.getCurrentUserFromDB(req?.user?.email);

	// 	sendResponse(res, 'User', 'GET', user);
	// });
}

export const userControllers = new UserControllers();
