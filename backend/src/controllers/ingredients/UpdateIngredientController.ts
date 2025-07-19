import { makeUpdateIngredientUseCase } from "@/factories/ingredients/ingredients.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  emoji: z.string().emoji(),
});

export class UpdateIngredientController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        ingredientId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { name, emoji } = schema.parse(request.body);
    const updateIngredientUseCase = makeUpdateIngredientUseCase();

    try {
      await updateIngredientUseCase.execute(request.params.ingredientId, {
        name,
        emoji,
      });

      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  }
}
