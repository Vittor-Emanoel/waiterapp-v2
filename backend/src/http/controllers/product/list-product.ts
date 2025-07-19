import { makeListProductsUseCase } from "@/useCases/factories/product/makeListProductsUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function listProducts(
  request: FastifyRequest,
	reply: FastifyReply,
) {
	const listProductsUseCase = makeListProductsUseCase();

	try {
		const { products } = await listProductsUseCase.execute();

		return reply.status(200).send(products);
	} catch (error) {
		return reply.status(500).send({ message: "Internal server error" });
	}
}
