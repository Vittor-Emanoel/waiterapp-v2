import { IOrdersRepository } from "@/repositories/IOrdersRepository";
import { OrderStatus } from "@prisma/client";

export class UpdateOrderStatusUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(orderId: string, status: OrderStatus) {
    const order = this.ordersRepository.updateStatus(orderId, status);

    return order;
  }
}
