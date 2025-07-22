import { ProductNotFoundError } from "@/errors/application/ProductNotFound";
import {
  CreateOrderDTO,
  IOrdersRepository,
} from "@/repositories/IOrdersRepository";
import { Prisma } from "@prisma/client";

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}
  async execute(data: CreateOrderDTO) {
    try {
      const order = await this.ordersRepository.create(data);
      return order;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ProductNotFoundError();
      }

      throw error;
    }
  }
}
