import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "@/useCases/category/create-category";

export function makeCreateCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository();
	const categoriesUseCase = new CreateCategoryUseCase(categoriesRepository);

	return categoriesUseCase;
}
