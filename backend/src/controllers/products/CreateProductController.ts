import { makeCreateProductUseCase } from "@/factories/products/makeCreateProductUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  description: z.string(),
  price: z.number().min(1),
  imageUrl: z.string().url(),
  categoryId: z.string().uuid(),
  ingredientIds: z.array(z.string().uuid()).min(1),
});

export class CreateProductController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, imageUrl, price, categoryId, ingredientIds } =
      schema.parse(request.body);

    const createProductUseCase = makeCreateProductUseCase();

    try {
      await createProductUseCase.execute({
        name,
        description,
        imageUrl,
        price,
        categoryId,
        ingredientIds,
      });

      return reply.status(201).send();
    } catch (error) {
      throw error;
    }
  }
}
