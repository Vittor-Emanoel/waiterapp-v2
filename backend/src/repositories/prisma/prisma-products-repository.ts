import {
  CreateProductDTO,
  UpdateProductDTO,
} from "@/dtos/products/products-dto";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";
import type { IProductsRepository } from "../IProductsRepository";

export class PrismaProductsRepository implements IProductsRepository {
  async create({
    category,
    description,
    imageUrl,
    ingredientIds,
    name,
    price,
  }: CreateProductDTO) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId: category,
        ingredients: {
          connect: ingredientIds.map((id) => ({ id })),
        },
      },
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

  async update(
    id: string,
    {
      category,
      description,
      imageUrl,
      ingredientIds,
      name,
      price,
    }: UpdateProductDTO,
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId: category,
        ingredients: {
          connect: ingredientIds?.map((id) => ({ id })),
        },
      },
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
