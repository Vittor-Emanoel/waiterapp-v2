import { prisma } from "@/lib/prisma";
import { Order, OrderStatus } from "@prisma/client";
import { IOrdersRepository } from "../IOrdersRepository";

export interface CreateOrderDTO {
  table: number;
  products: {
    productId: string;
    quantity: number;
  }[];
}

// Essa interface define o formato dos pedidos com totais calculados
export interface OrderWithTotals {
  id: string;
  status: OrderStatus;
  table: number;
  createdAt: Date;
  day: string;
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

export class PrismaOrdersRepository implements IOrdersRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        table: data.table,
        status: OrderStatus.WAITING,
        day: {
          create: {
            date: new Date(),
            active: true,
          },
        },
        products: {
          create: data.products.map((product) => ({
            product: {
              connect: { id: product.productId },
            },
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  }

  async getAll(): Promise<OrderWithTotals[]> {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        table: true,
        createdAt: true,
        day: true,
        products: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                imageUrl: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => {
      let total = 0;

      const productsWithSubtotal = order.products.map((item) => {
        const price = Number(item.product.price);
        const subtotal = price * item.quantity;
        total += subtotal;

        return {
          id: item.id,
          quantity: item.quantity,
          subtotal,
          product: {
            id: item.product.id,
            name: item.product.name,
            description: item.product.description ?? null,
            imageUrl: item.product.imageUrl ?? null,
            price: price,
          },
        };
      });

      return {
        id: order.id,
        status: order.status,
        table: order.table,
        createdAt: order.createdAt,
        total: Number(total.toFixed(2)),
        products: productsWithSubtotal,
      };
    });
  }
  async updateStatus(
    orderId: string,
    orderStatus: OrderStatus
  ): Promise<Order> {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
    });

    return order;
  }
}
