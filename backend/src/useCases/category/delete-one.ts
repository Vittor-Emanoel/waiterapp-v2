import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class DeleteOneCategoryUseCase {
	constructor(private categoryRepository: ICategoriesRepository) {}
	async execute(categoryId: string) {
		const categories = await this.categoryRepository.deleteOne(categoryId);

		return { categories };
	}
}
