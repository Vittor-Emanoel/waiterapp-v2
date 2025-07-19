
import { makeListCategoriesUseCase } from "@/factories/categories/categories.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListCategoriesController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const listCategoriesUseCase = makeListCategoriesUseCase();

    try {
      const { categories } = await listCategoriesUseCase.execute();

      return reply.status(200).send(categories);
    } catch (error) {
      throw error;
    }
  }
}
