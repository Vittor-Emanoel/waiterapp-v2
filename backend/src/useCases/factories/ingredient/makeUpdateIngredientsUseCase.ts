import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredientes-repository";
import { UpdateIngredientsUseCase } from "@/useCases/ingredient/update-category";

export function makeUpdateIngredientsUseCase() {
	const ingredientsRepository = new PrismaIngredientsRepository();
	const updateIngredientsUseCase = new UpdateIngredientsUseCase(
		ingredientsRepository,
	);

	return updateIngredientsUseCase;
}
