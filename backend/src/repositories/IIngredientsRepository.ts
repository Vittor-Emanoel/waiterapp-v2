import {
  CreateIngredientDTO,
  UpdateIngredientDTO,
} from "@/dtos/ingredients/ingredients-dto";
import type { Ingredient } from "@prisma/client";

export interface IIngredientsRepository {
  create(data: CreateIngredientDTO): Promise<Ingredient>;
  getAll(): Promise<Ingredient[]>;
  update(ingredientId: string, data: UpdateIngredientDTO): Promise<void>;
  delete(ingredientId: string): Promise<void>;
  findByName(name: string): Promise<Ingredient | null>;
  findByIds(ingredientIds: string[]): Promise<Ingredient[]>;
}
