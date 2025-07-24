import { CreateOrderDTO, OrderDetailsDTO } from "@/dtos/orders/orders-dto";
import { Order, OrderStatus } from "@prisma/client";

export interface IOrdersRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  getAll(): Promise<OrderDetailsDTO[]>;
  updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
}
