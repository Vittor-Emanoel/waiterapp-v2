import { IOrdersRepository } from "@/repositories/IOrdersRepository";

export class ListOrdersUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute() {
    const orders = await this.ordersRepository.getAll();

    return orders;
  }
}
