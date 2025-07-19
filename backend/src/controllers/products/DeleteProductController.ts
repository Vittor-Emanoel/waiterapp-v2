import { makeDeleteProductsUseCase } from "@/factories/products/makeDeleteProductUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";

export class DeleteProductController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        productId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { productId } = request.params;

    const deleteProductUseCase = makeDeleteProductsUseCase();

    try {
      await deleteProductUseCase.execute({ productId });

      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  }
}
