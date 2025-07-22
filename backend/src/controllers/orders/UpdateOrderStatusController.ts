import { makeUpdateOrderStatusUseCase } from "@/factories/orders/orders.factory";
import { io } from "@/index";
import { OrderStatus } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  orderId: z.string().min(1),
  status: z.nativeEnum(OrderStatus),
});

export class UpdateOrderStatusController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { orderId, status } = schema.parse(request.body);

    const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase();

    try {
      const order = updateOrderStatusUseCase.execute(orderId, status);

      io.emit("order@updateStatus", order);

      return order;
    } catch (error) {
      throw error;
    }
  }
}
