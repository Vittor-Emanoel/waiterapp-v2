import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";
import { Prisma } from "@prisma/client";

export class DeleteIngredientUseCase {
  constructor(private readonly ingredientsRepository: IIngredientsRepository) {}
  async execute(ingredientId: string) {
    try {
      const ingredient = await this.ingredientsRepository.delete(ingredientId);

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
