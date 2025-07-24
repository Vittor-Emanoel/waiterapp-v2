import { OrderStatus } from "@prisma/client";

export interface CreateOrderDTO {
  table: number;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface OrderDetailsDTO {
  id: string;
  status: OrderStatus;
  table: number;
  createdAt: Date;
  total: number;
  products: {
    id: string;
    quantity: number;
    subtotal: number;
    product: {
      id: string;
      name: string;
      description?: string | null;
      imageUrl: string | null;
      price: number;
    };
  }[];
}

export type UpdateOrderDTO = Partial<CreateOrderDTO>;
