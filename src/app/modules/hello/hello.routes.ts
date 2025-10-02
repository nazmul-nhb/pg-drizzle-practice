import validateRequest from '@/middlewares/validateRequest';
import { helloControllers } from '@/modules/hello/hello.controllers';
import { helloValidations } from '@/modules/hello/hello.validation';
import { Router } from 'express';

const router = Router();

router.post(
	'/',
	validateRequest(helloValidations.creationSchema),
	helloControllers.createHello
);

router.get('/', helloControllers.getAllHellos);

router.get('/:id', helloControllers.getHelloById);

router.patch(
	'/:id',
	validateRequest(helloValidations.updateSchema),
	helloControllers.updateHelloById
);

router.delete('/:id', helloControllers.deleteHelloById);

export const helloRoutes = router;
