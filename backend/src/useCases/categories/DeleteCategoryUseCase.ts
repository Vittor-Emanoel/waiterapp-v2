import { CategoryNotFoundError } from "@/errors/application/CategoryNotFound";
import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";
import { Prisma } from "@prisma/client";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  async execute(categoryId: string) {
    try {
      const category = await this.categoryRepository.delete(categoryId);

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
