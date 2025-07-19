import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";

export interface ICreateCategoryRequest {
  name: string;
  emoji: string;
}

export class CreateIngredientsUseCase {
  constructor(private ingredientsRepository: IIngredientsRepository) {}
  async execute({ name, emoji }: ICreateCategoryRequest) {
    const ingredientAlreadyExists =
      await this.ingredientsRepository.findByName(name);

    if (ingredientAlreadyExists) {
      throw new Error("Ingredient already exists");
    }

    const ingredient = await this.ingredientsRepository.create({
      name,
      emoji,
    });

    return { ingredient };
  }
}
