import { CategoryNameAlreadyInUseError } from "@/errors/application/CategoryNameAlreadyInUse";
import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export interface ICreateCategoryRequest {
  name: string;
  emoji: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoriesRepository) {}
  async execute({ name, emoji }: ICreateCategoryRequest) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new CategoryNameAlreadyInUseError();
    }

    const category = await this.categoryRepository.create({
      name,
      emoji,
    });

    return { category };
  }
}
