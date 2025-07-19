import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { ListCategoryUseCase } from "@/useCases/category/list-category";

export function makeListCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository();
	const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository);

	return listCategoriesUseCase;
}
