
import { makeDeleteProductsUseCase } from "@/useCases/factories/product/makeDeleteProductUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProductParamsSchema = z.object({
    productId: z.string().uuid(),
  });

  const { productId } = deleteProductParamsSchema.parse(request.params);

  const deleteProductUseCase = makeDeleteProductsUseCase();

  try {
    await deleteProductUseCase.execute({ productId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return reply.status(404).send({ message: error.message });
      }
    }
    return reply.status(500).send({ message: "Internal server error" });
  }
}
