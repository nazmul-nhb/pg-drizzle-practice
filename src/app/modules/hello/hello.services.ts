import { db } from '#/drizzle';
import { hellos } from '#/drizzle/schema/hellos';
import { ErrorWithStatus } from '@/errors/ErrorWithStatus';
import type { InsertHello } from '@/modules/hello/hello.types';
import type { TQueries } from '@/types';
import { eq } from 'drizzle-orm';
import { isNotEmptyObject } from 'nhb-toolbox';
import { STATUS_CODES } from 'nhb-toolbox/constants';

class HelloServices {
	/**
	 * * Create new hello in the DB.
	 * @param payload All the required fields to create hello.
	 * @returns Created new hello.
	 */
	async createHelloInDB(payload: InsertHello) {
		const [hello] = await db.insert(hellos).values(payload).returning();

		if (!hello) {
			throw new ErrorWithStatus(
				'Creation Error',
				'Cannot create hello right now! Please try again later!',
				STATUS_CODES.INTERNAL_SERVER_ERROR,
				'CREATE /hello'
			);
		}

		return hello;
	}

	/**
	 * * Get all hellos from database.
	 * @param query Optional query parameters to pass.
	 * @returns All hellos that matched the query as an array.
	 */
	async getAllHellosFromDB(query?: TQueries<InsertHello>) {
		console.log(query);

		const result = await db.select().from(hellos).orderBy(hellos.id);

		return result;
	}

	/**
	 * * Retrieve single hello from DB.
	 * @param id ID of hello in integer form.
	 * @returns The matched hello against the provided id.
	 */
	async getHelloByIdFromDB(id: number) {
		const hello = await db.query.hellos.findFirst({
			where: (ut, q) => q.eq(ut.id, id),
		});

		if (!hello) {
			throw new ErrorWithStatus(
				'Not Found Error',
				`Hello not found with id ${id}!`,
				STATUS_CODES.NOT_FOUND,
				'GET hellos/:id'
			);
		}

		return hello;
	}

	/**
	 * * Delete single hello from DB.
	 * @param id ID of the hello to delete.
	 * @returns Deleted hello's id as `{ deleted_id: number }`
	 */
	async deleteHelloByIdFromDB(id: number) {
		const [res] = await db
			.delete(hellos)
			.where(eq(hellos.id, id))
			.returning({ deleted_id: hellos.id });

		if (!res) {
			throw new ErrorWithStatus(
				'Delete Error',
				`Cannot delete hello with id ${id}!`,
				STATUS_CODES.NOT_FOUND,
				'DELETE hellos/:id'
			);
		}

		return res;
	}

	/**
	 * * Update hello in DB by id.
	 * @param id ID to find hello from DB.
	 * @param payload Fields to update in hello.
	 */
	async updateHelloInDB(id: number, payload: Partial<InsertHello>) {
		if (!isNotEmptyObject(payload)) {
			throw new ErrorWithStatus(
				'Empty Payload',
				`Your payload is empty for hello with id ${id}!`,
				STATUS_CODES.BAD_REQUEST,
				'PATCH hellos/:id'
			);
		}

		const [res] = await db.update(hellos).set(payload).where(eq(hellos.id, id)).returning();

		if (!res) {
			throw new ErrorWithStatus(
				'Update Error',
				`Cannot update hello with id ${id}!`,
				STATUS_CODES.NOT_FOUND,
				'PATCH hellos/:id'
			);
		}

		return res;
	}
}

export const helloServices = new HelloServices();
