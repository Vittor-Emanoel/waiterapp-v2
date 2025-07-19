import { prisma } from "@/lib/prisma";
import type { Prisma, Product } from "@prisma/client";
import type { IProductsRepository } from "../IProductsRepository";

export class PrismaProductsRepository implements IProductsRepository {
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
      include: {
        ingredients: true,
        category: true,
      },
    });

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        name: name,
      },
    });

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        ingredients: true,
        category: true,
      },
    });

    return product;
  }

  async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        ingredients: true,
        category: true,
      },
    });

    return products;
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data,
      include: {
        ingredients: true,
        category: true,
      },
    });

    return product;
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}


