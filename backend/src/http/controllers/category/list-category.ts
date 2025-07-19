import { makeListCategoriesUseCase } from "@/useCases/factories/category/makeListCategoriesUseCase";

import type { FastifyReply, FastifyRequest } from "fastify";

export async function listCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listCategoriesUseCase = makeListCategoriesUseCase();

  try {
    const { categories } = await listCategoriesUseCase.execute();

    return reply.status(200).send(categories);
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
}
