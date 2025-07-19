import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { UpdateCategoryUseCase } from "@/useCases/category/update-category";

export function makeUpdateCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository();
	const updateCategoriesUseCase = new UpdateCategoryUseCase(
		categoriesRepository,
	);

	return updateCategoriesUseCase;
}
