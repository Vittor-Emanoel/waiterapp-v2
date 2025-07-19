import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "@/useCases/categories/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "@/useCases/categories/DeleteCategoryUseCase";
import { ListCategoryUseCase } from "@/useCases/categories/ListCategoryUseCase";
import { UpdateCategoryUseCase } from "@/useCases/categories/UpdateCategoryUseCase";

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const categoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return categoryUseCase;
}

export function makeDeleteCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

  return deleteCategoryUseCase;
}

export function makeListCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository);

  return listCategoriesUseCase;
}

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

  return updateCategoryUseCase;
}
