import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class ListCategoryUseCase {
	constructor(private categoryRepository: ICategoriesRepository) {}
	async execute() {
		const categories = await this.categoryRepository.getAll();

		return { categories };
	}
}
