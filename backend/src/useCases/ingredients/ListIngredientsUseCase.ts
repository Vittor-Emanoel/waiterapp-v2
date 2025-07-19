import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";

export class ListIngredientsUseCase {
  constructor(private ingredientsRepository: IIngredientsRepository) {}
  async execute() {
    const ingredients = await this.ingredientsRepository.getAll();

    return { ingredients };
  }
}
