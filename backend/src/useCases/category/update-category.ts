import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export interface IUpdateCategoryRequest {
	name: string;
	emoji: string;
}

export class UpdateCategoryUseCase {
	constructor(private categoryRepository: ICategoriesRepository) {}
	async execute(categoryId: string, { name, emoji }: IUpdateCategoryRequest) {
		const categories = await this.categoryRepository.update(categoryId, {
			name,
			emoji,
		});

		return { categories };
	}
}
