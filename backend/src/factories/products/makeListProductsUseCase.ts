import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { ListProductsUseCase } from "@/useCases/products/ListProductsUseCase";

export function makeListProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const productsUseCase = new ListProductsUseCase(productsRepository);

  return productsUseCase;
}
