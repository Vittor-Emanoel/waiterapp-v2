import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { DeleteOneCategoryUseCase } from "@/useCases/category/delete-one";

export function makeDeleteOneCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository();
	const deleteOneCategoriesUseCase = new DeleteOneCategoryUseCase(
		categoriesRepository,
	);

	return deleteOneCategoriesUseCase;
}
