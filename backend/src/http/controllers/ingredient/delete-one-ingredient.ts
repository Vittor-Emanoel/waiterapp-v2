import { makeDeleteOneIngredientsUseCase } from "@/useCases/factories/ingredient/makeDeleteOneIngredientsUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function deleteOneIngredient(
	request: FastifyRequest<{
		Params: {
			ingredientId: string;
		};
	}>,
	reply: FastifyReply,
) {
	const deleteOneIngredientsUseCase = makeDeleteOneIngredientsUseCase();

	try {
		await deleteOneIngredientsUseCase.execute(request.params.ingredientId);

		return reply.status(200).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
