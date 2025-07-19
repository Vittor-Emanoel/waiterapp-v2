import { makeDeleteIngredientUseCase } from "@/factories/ingredients/ingredients.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteIngredientController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        ingredientId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const deleteIngredientUseCase = makeDeleteIngredientUseCase();

    try {
      await deleteIngredientUseCase.execute(request.params.ingredientId);

      return reply.status(200).send();
    } catch (error) {
      throw error;
    }
  }
}
