import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredients-repository";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { CreateProductUseCase } from "@/useCases/product/create-product";

export function makeCreateProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const ingredientsRepository = new PrismaIngredientsRepository();

  const productsUseCase = new CreateProductUseCase(
    productsRepository,
    categoriesRepository,
    ingredientsRepository,
  );

  return productsUseCase;
}
