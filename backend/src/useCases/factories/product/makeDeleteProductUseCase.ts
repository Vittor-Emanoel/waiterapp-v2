import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { DeleteProductUseCase } from "@/useCases/product/delete-product";


export function makeDeleteProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productsRepository);

  return deleteProductUseCase;
}
