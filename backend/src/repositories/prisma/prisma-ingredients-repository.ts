import { CreateCategoryDTO } from "@/dtos/categories/categories-dto";
import { UpdateIngredientDTO } from "@/dtos/ingredients/ingredients-dto";
import { prisma } from "@/lib/prisma";
import type { Ingredient } from "@prisma/client";
import type { IIngredientsRepository } from "../IIngredientsRepository";

export class PrismaIngredientsRepository implements IIngredientsRepository {
  async create(data: CreateCategoryDTO) {
    const ingredient = await prisma.ingredient.create({
      data,
    });

    return ingredient;
  }

  async update(ingredientId: string, data: UpdateIngredientDTO) {
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
  async findByIds(ingredientIds: string[]): Promise<Ingredient[]> {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredientIds,
        },
      },
    });

    return ingredients;
  }
}
