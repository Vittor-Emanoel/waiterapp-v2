import { prisma } from "@/lib/prisma";
import { Order, OrderProducts } from "@prisma/client";
import { CreateOrderDTO, IOrdersRepository } from "../IOrdersRepository";

type OrderWithProducts = Order & {
  products: OrderProducts[];
};

export class PrismaOrdersRepository implements IOrdersRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        table: data.table,
        status: "WAITING",
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
  async getAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        table: true,
        createdAt: true,
        products: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
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

    const ordersWithTotals = orders.map((order) => {
      let total = 0;
      let totalItems = 0;

      const productsWithSubtotal = order.products.map((item) => {
        const price = Number(item.product.price);
        const subtotal = price * item.quantity;

        total += subtotal;
        totalItems += item.quantity;

        return {
          id: item.id,
          quantity: item.quantity,
          subtotal: subtotal,
          product: {
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            imageUrl: item.product.imageUrl,
            price: item.product.price,
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

    return ordersWithTotals;
  }
}
