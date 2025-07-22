import { Order } from "@prisma/client";

//refatorar!
export interface CreateOrderDTO {
  table: number;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface IOrdersRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  getAll(): Promise<Order[]>;
}
