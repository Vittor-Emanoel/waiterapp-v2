import { makeListProductsUseCase } from "@/factories/products/makeListProductsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListProductsController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const listProductsUseCase = makeListProductsUseCase();

    try {
      const { products } = await listProductsUseCase.execute();

      return reply.status(200).send(products);
    } catch (error) {
      throw error;
    }
  }
}
