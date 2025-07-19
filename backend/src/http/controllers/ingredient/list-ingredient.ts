import { makeListIngredientsUseCase } from "@/useCases/factories/ingredient/makeListIngredientsUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function listIngredient(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const listIngredientsUseCase = makeListIngredientsUseCase();

	try {
		const ingredients = await listIngredientsUseCase.execute();

		return reply.status(200).send(ingredients);
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
