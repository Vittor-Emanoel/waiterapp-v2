import type { Ingredient, Prisma } from "@prisma/client";

export interface IIngredientsRepository {
  create(data: Prisma.IngredientCreateInput): Promise<Ingredient>;
  findByName(name: string): Promise<Ingredient | null>;
  getAll(): Promise<Ingredient[]>;
  update(
    ingredientId: string,
    data: Prisma.IngredientUpdateInput,
  ): Promise<void>;
  delete(ingredientId: string): Promise<void>;
  findByIds(ids: string[]): Promise<Ingredient[]>;
}
