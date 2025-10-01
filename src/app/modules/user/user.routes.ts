import { userControllers } from '@/modules/user/user.controllers';
import { Router } from 'express';

const router = Router();

router.get(
	'/',
	// authorizeUser(...ADMIN_ROLES),
	userControllers.getAllUsers
);

// router.get('/profile', authorizeUser(...USER_ROLES), userControllers.getCurrentUser);

export const userRoutes = router;
