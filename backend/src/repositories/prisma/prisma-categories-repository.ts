import { prisma } from "@/lib/prisma";
import type { Category, Prisma } from "@prisma/client";
import type { ICategoriesRepository } from "../ICategoriesRepository";

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async update(categoryId: string, data: Prisma.CategoryUpdateInput) {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
  }

  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return categories;
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    return category;
  }
}
