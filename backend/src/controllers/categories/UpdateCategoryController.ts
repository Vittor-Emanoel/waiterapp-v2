
import { makeUpdateCategoryUseCase } from "@/factories/categories/categories.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  emoji: z.string().emoji(),
});

export class UpdateCategoryController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        categoryId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { name, emoji } = schema.parse(request.body);
    const updateCategoryUseCase = makeUpdateCategoryUseCase();

    try {
      await updateCategoryUseCase.execute(request.params.categoryId, {
        name,
        emoji,
      });

      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  }
}
