import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { CreateOrderUseCase } from "@/useCases/orders/CreateOrderUseCase";
import { UpdateOrderStatusUseCase } from "@/useCases/orders/UpdateOrderStatusUseCase";

export function makeCreateOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository();
  const createOrderUseCase = new CreateOrderUseCase(ordersRepository);

  return createOrderUseCase;
}

export function makeUpdateOrderStatusUseCase() {
  const ordersRepository = new PrismaOrdersRepository();
  const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
    ordersRepository
  );

  return updateOrderStatusUseCase;
}
