import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "@/useCases/category/create-category";
import { DeleteCategoryUseCase } from "@/useCases/category/delete-one";
import { ListCategoryUseCase } from "@/useCases/category/list-category";
import { UpdateCategoryUseCase } from "@/useCases/category/update-category";

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const categoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return categoryUseCase;
}

export function makeDeleteCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(
    categoryRepository,
  );

  return deleteCategoryUseCase;
}

export function makeListCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository);

  return listCategoriesUseCase;
}

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryRepository,
  );

  return updateCategoryUseCase;
}
