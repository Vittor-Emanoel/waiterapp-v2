
import { makeUpdateProductsUseCase } from "@/useCases/factories/product/makeUpdateProductsUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProductParamsSchema = z.object({
    productId: z.string().uuid(),
  });

  const updateProductSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().min(1).optional(),
    imageUrl: z.string().url().optional(),
    categoryId: z.string().uuid().optional(),
    ingredientIds: z.array(z.string().uuid()).optional(),
  });

  const { productId } = updateProductParamsSchema.parse(request.params);
  const { name, description, imageUrl, price, categoryId, ingredientIds } =
    updateProductSchema.parse(request.body);

  const updateProductUseCase = makeUpdateProductsUseCase();

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
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return reply.status(404).send({ message: error.message });
      }
      if (
        error.message === "A product with this name already exists" ||
        error.message === "Category not found" ||
        error.message === "One or more ingredients not found"
      ) {
        return reply.status(400).send({ message: error.message });
      }
    }
    return reply.status(500).send({ message: "Internal server error" });
  }
}
