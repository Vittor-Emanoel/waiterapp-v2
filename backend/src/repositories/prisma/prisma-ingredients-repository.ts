import { prisma } from "@/lib/prisma";
import type { Ingredient, Prisma } from "@prisma/client";
import type { IIngredientsRepository } from "../IIngredientsRepository";

export class PrismaIngredientsRepository implements IIngredientsRepository {
  async create(data: Prisma.IngredientCreateInput) {
    const ingredient = await prisma.ingredient.create({
      data,
    });

    return ingredient;
  }

  async update(ingredientId: string, data: Prisma.IngredientCreateInput) {
    await prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: {
        name: data.name,
        emoji: data.emoji,
      },
    });
  }

  async delete(ingredientId: string): Promise<void> {
    await prisma.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });
  }

  async findByName(name: string) {
    const ingredient = await prisma.ingredient.findUnique({
      where: {
        name,
      },
    });

    return ingredient;
  }

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return ingredients;
  }
  async findByIds(ids: string[]): Promise<Ingredient[]> {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return ingredients;
  }
}
