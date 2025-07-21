import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";
import { CreateOrderDTO, IOrdersRepository } from "../IOrdersRepository";

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
}
