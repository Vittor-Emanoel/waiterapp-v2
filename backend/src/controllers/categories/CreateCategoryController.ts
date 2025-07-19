
import { makeCreateCategoryUseCase } from "@/factories/categories/categories.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  emoji: z.string().emoji(),
});

export class CreateCategoryController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, emoji } = schema.parse(request.body);

    const categoryUseCase = makeCreateCategoryUseCase();

    try {
      await categoryUseCase.execute({
        name,
        emoji,
      });

      return reply.status(201).send();
    } catch (error) {
      throw error;
    }
  }
}
