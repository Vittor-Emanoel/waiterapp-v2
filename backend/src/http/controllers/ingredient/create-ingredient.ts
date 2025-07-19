import { makeCreateIngredientsUseCase } from "@/useCases/factories/ingredient/makeCreateIngredientsUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createIngredient(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createIngredientSchema = z.object({
		name: z.string().min(3),
		emoji: z.string().emoji(),
	});

	const { name, emoji } = createIngredientSchema.parse(request.body);
	const ingredientsUseCase = makeCreateIngredientsUseCase();

	try {
		await ingredientsUseCase.execute({
			name,
			emoji,
		});

		return reply.status(201).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
