import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";
import { Prisma } from "@prisma/client";

export interface IUpdateIngredientRequest {
  name: string;
  emoji: string;
}

export class UpdateIngredientsUseCase {
  constructor(private ingredientsRepository: IIngredientsRepository) {}
  async execute(
    ingredientId: string,
    { name, emoji }: IUpdateIngredientRequest,
  ) {
    try {
      const ingredient = await this.ingredientsRepository.update(ingredientId, {
        name,
        emoji,
      });

      return { ingredient };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return "ingredient not";
      }
    }
  }
}
