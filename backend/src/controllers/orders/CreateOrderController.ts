import { makeCreateOrderUseCase } from "@/factories/orders/orders.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  table: z.number().min(1),
  products: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().min(1),
      })
    )
    .min(1),
});
export class CreateOrderController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { table, products } = schema.parse(request.body);

    const orderUseCase = makeCreateOrderUseCase();

    try {
      await orderUseCase.execute({
        table,
        products,
      });

      return reply.status(201).send();
    } catch (error) {
      throw error;
    }
  }
}
