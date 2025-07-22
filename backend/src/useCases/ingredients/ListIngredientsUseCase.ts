import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";

export class ListIngredientsUseCase {
  constructor(private readonly ingredientsRepository: IIngredientsRepository) {}
  async execute() {
    const ingredients = await this.ingredientsRepository.getAll();

    return { ingredients };
  }
}
