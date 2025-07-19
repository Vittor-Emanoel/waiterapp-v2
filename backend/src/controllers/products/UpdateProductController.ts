import { makeUpdateProductUseCase } from "@/factories/products/makeUpdateProductUseCase";
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

export class UpdateProductController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        productId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { productId } = request.params;
    const { name, description, imageUrl, price, categoryId, ingredientIds } =
      schema.parse(request.body);

    const updateProductUseCase = makeUpdateProductUseCase();

    try {
      const { product } = await updateProductUseCase.execute({
        id: productId,
        name,
        description,
        imageUrl,
        price,
        categoryId,
        ingredientIds,
      });

      return reply.status(200).send({
        product,
      });
    } catch (error) {
      throw error;
    }
  }
}
