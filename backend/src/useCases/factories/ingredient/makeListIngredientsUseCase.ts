import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredientes-repository";
import { ListIngredientsUseCase } from "@/useCases/ingredient/list-category";

export function makeListIngredientsUseCase() {
	const ingredientsRepository = new PrismaIngredientsRepository();
	const listIngredientsUseCase = new ListIngredientsUseCase(
		ingredientsRepository,
	);

	return listIngredientsUseCase;
}
