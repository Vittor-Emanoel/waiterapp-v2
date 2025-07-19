import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class DeleteCategoryUseCase {
	constructor(private categoryRepository: ICategoriesRepository) {}
	async execute(categoryId: string) {
		const category = await this.categoryRepository.deleteOne(categoryId);

		return { category };
	}
}
