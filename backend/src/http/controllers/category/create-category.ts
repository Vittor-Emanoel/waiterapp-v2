import { makeCreateCategoriesUseCase } from "@/useCases/factories/category/makeCreateCategoriesUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCategory(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createCategorySchema = z.object({
		name: z.string().min(3),
		emoji: z.string().emoji(),
	});

	const { name, emoji } = createCategorySchema.parse(request.body);
	const categoriesUseCase = makeCreateCategoriesUseCase();

	try {
		await categoriesUseCase.execute({
			name,
			emoji,
		});

		return reply.status(201).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
