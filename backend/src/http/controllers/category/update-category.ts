import { makeUpdateCategoriesUseCase } from "@/useCases/factories/category/makeUpdateCategoriesUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateCategory(
	request: FastifyRequest<{
		Params: {
			categoryId: string;
		};
	}>,
	reply: FastifyReply,
) {
	const updateCategorySchema = z.object({
		name: z.string().min(3),
		emoji: z.string().emoji(),
	});

	const { name, emoji } = updateCategorySchema.parse(request.body);
	const updateCategoriesUseCase = makeUpdateCategoriesUseCase();

	try {
		await updateCategoriesUseCase.execute(request.params.categoryId, {
			name,
			emoji,
		});

		return reply.status(204).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
