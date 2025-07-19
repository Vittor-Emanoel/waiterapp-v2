import { CategoryNotFoundError } from "@/errors/application/CategoryNotFound";
import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";
import { Prisma } from "@prisma/client";

export interface IUpdateCategoryRequest {
  name: string;
  emoji: string;
}

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  async execute(categoryId: string, { name, emoji }: IUpdateCategoryRequest) {
    try {
      const category = await this.categoryRepository.update(categoryId, {
        name,
        emoji,
      });

      return { category };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new CategoryNotFoundError();
      }
    }
  }
}
