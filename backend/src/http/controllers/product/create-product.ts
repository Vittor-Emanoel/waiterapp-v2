
import { makeCreateProductsUseCase } from "@/useCases/factories/product/makeCreateProductsUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductSchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    price: z.number().min(1),
    imageUrl: z.string().url(),
    categoryId: z.string().uuid(),
    ingredientIds: z.array(z.string().uuid()).min(1),
  });

  const { name, description, imageUrl, price, categoryId, ingredientIds } =
    createProductSchema.parse(request.body);

  const createProductUseCase = makeCreateProductsUseCase();

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
    return reply.status(500).send({ message: "Internal server error" });
  }
}
