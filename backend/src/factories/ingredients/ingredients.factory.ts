import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredients-repository";
import { CreateIngredientsUseCase } from "@/useCases/ingredient/create-category";
import { DeleteOneIngredientsUseCase } from "@/useCases/ingredient/delete-one";
import { ListIngredientsUseCase } from "@/useCases/ingredient/list-category";
import { UpdateIngredientsUseCase } from "@/useCases/ingredient/update-category";

export function makeCreateIngredientUseCase() {
  const ingredientRepository = new PrismaIngredientsRepository();
  const ingredientUseCase = new CreateIngredientsUseCase(ingredientRepository);

  return ingredientUseCase;
}

export function makeDeleteIngredientUseCase() {
  const ingredientRepository = new PrismaIngredientsRepository();
  const deleteIngredientUseCase = new DeleteOneIngredientsUseCase(
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
