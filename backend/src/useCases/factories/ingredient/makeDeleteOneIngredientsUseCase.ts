import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredientes-repository";
import { DeleteOneIngredientsUseCase } from "@/useCases/ingredient/delete-one";

export function makeDeleteOneIngredientsUseCase() {
	const ingredientsRepository = new PrismaIngredientsRepository();
	const deleteOneIngredientsUseCase = new DeleteOneIngredientsUseCase(
		ingredientsRepository,
	);

	return deleteOneIngredientsUseCase;
}
