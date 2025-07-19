import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { ListProductsUseCase } from "@/useCases/product/list-products";

export function makeListProductsUseCase() {
	const productsRepository = new PrismaProductsRepository();
	const productsUseCase = new ListProductsUseCase(
		productsRepository,
	);

	return productsUseCase;
}
