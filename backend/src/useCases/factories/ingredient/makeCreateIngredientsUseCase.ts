import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredientes-repository";
import { CreateIngredientsUseCase } from "@/useCases/ingredient/create-category";

export function makeCreateIngredientsUseCase() {
	const ingredientsRepository = new PrismaIngredientsRepository();
	const ingredientsUseCase = new CreateIngredientsUseCase(
		ingredientsRepository,
	);

	return ingredientsUseCase;
}
