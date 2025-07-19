import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaIngredientsRepository } from "@/repositories/prisma/prisma-ingredients-repository";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { UpdateProductUseCase } from "@/useCases/product/update-product";

export function makeUpdateProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const ingredientsRepository = new PrismaIngredientsRepository();

  const updateProductUseCase = new UpdateProductUseCase(
    productsRepository,
    categoriesRepository,
    ingredientsRepository,
  );

  return updateProductUseCase;
}
