import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredients-repository";
import { CreateIngredientsUseCase } from "@/useCases/ingredients/CreateIngredientUseCase";
import { DeleteIngredientUseCase } from "@/useCases/ingredients/DeleteIngredientUseCase";
import { ListIngredientsUseCase } from "@/useCases/ingredients/ListIngredientsUseCase";
import { UpdateIngredientsUseCase } from "@/useCases/ingredients/UpdateIngredientUseCase";

export function makeCreateIngredientUseCase() {
  const ingredientRepository = new PrismaIngredientsRepository();
  const ingredientUseCase = new CreateIngredientsUseCase(ingredientRepository);

  return ingredientUseCase;
}

export function makeDeleteIngredientUseCase() {
  const ingredientRepository = new PrismaIngredientsRepository();
  const deleteIngredientUseCase = new DeleteIngredientUseCase(
    ingredientRepository,
  );

  return deleteIngredientUseCase;
}

export function makeListIngredientsUseCase() {
  const ingredientsRepository = new PrismaIngredientsRepository();
  const listIngredientsUseCase = new ListIngredientsUseCase(
    ingredientsRepository,
  );

  return listIngredientsUseCase;
}

export function makeUpdateIngredientUseCase() {
  const ingredientRepository = new PrismaIngredientsRepository();
  const updateIngredientsUseCase = new UpdateIngredientsUseCase(
    ingredientRepository,
  );

  return updateIngredientsUseCase;
}
