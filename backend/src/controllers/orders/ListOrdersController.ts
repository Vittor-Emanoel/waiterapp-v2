import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { ListOrdersUseCase } from "@/useCases/orders/ListOrdersUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ListOrdersController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const ordersRepository = new PrismaOrdersRepository();
    const listOrdersUseCase = new ListOrdersUseCase(ordersRepository);
    try {
      const orders = await listOrdersUseCase.execute();

      return orders;
    } catch (error) {}
  }
}
