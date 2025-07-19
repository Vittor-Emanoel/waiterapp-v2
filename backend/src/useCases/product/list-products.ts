import { IProductsRepository } from "@/repositories/IProductsRepository";

export class ListProductsUseCase {
	constructor(private productsRepository: IProductsRepository) {}
	async execute() {
		const products = await this.productsRepository.getAll();

		return { products };
	}
}
