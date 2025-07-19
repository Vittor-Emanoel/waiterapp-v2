import { makeUpdateIngredientsUseCase } from "@/useCases/factories/ingredient/makeUpdateIngredientsUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateIngredient(
	request: FastifyRequest<{
		Params: {
			ingredientId: string;
		};
	}>,
	reply: FastifyReply,
) {
	const updateIngredientSchema = z.object({
		name: z.string().min(3),
		emoji: z.string().emoji(),
	});

	const { name, emoji } = updateIngredientSchema.parse(request.body);
	const updateIngredientsUseCase = makeUpdateIngredientsUseCase();

	try {
		await updateIngredientsUseCase.execute(request.params.ingredientId, {
			name,
			emoji,
		});

		return reply.status(204).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
