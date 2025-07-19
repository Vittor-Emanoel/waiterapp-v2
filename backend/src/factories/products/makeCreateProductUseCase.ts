import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredients-repository";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { CreateProductUseCase } from "@/useCases/products/CreateProductUseCase";

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const ingredientsRepository = new PrismaIngredientsRepository();

  const productUseCase = new CreateProductUseCase(
    productsRepository,
    categoriesRepository,
    ingredientsRepository,
  );

  return productUseCase;
}
