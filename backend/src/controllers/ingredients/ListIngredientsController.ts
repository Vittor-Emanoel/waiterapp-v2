import { makeListIngredientsUseCase } from "@/factories/ingredients/ingredients.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListIngredientsController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const listIngredientsUseCase = makeListIngredientsUseCase();

    try {
      const { ingredients } = await listIngredientsUseCase.execute();

      return reply.status(200).send(ingredients);
    } catch (error) {
      throw error;
    }
  }
}
