import { makeDeleteOneCategoriesUseCase } from "@/useCases/factories/category/makeDeleteOneCategoriesUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function deleteOneCategory(
	request: FastifyRequest<{
		Params: {
			categoryId: string;
		};
	}>,
	reply: FastifyReply,
) {
	const deleteOneCategoriesUseCase = makeDeleteOneCategoriesUseCase();

	try {
		await deleteOneCategoriesUseCase.execute(request.params.categoryId);

		return reply.status(200).send();
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
