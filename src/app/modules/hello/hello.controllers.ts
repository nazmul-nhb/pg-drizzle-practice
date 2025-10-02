import { helloServices } from '@/modules/hello/hello.services';
import catchAsync from '@/utilities/catchAsync';
import sendResponse from '@/utilities/sendResponse';

class HelloControllers {
	/** * Create hello. */
	createHello = catchAsync(async (req, res) => {
		const hello = await helloServices.createHelloInDB(req.query);

		sendResponse(res, 'Hello', 'POST', hello);
	});

	/** * Get all hellos with optional queries. */
	getAllHellos = catchAsync(async (req, res) => {
		const hellos = await helloServices.getAllHellosFromDB(req.query);

		sendResponse(res, 'Hello', 'GET', hellos);
	});

	/** * Get hello by hello id. */
	getHelloById = catchAsync(async (req, res) => {
		const hello = await helloServices.getHelloByIdFromDB(Number(req.params.id));

		sendResponse(res, 'Hello', 'GET', hello);
	});

	/** * Delete hello by id. */
	deleteHelloById = catchAsync(async (req, res) => {
		const result = await helloServices.deleteHelloByIdFromDB(Number(req.params.id));

		sendResponse(res, 'Hello', 'DELETE', result);
	});

	/** * Update hello by id. */
	updateHelloById = catchAsync(async (req, res) => {
		const result = await helloServices.updateHelloInDB(Number(req.params.id), req.body);

		sendResponse(res, 'Hello', 'PATCH', result);
	});
}

export const helloControllers = new HelloControllers();
