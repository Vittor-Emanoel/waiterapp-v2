import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export interface ICreateCategoryRequest {
	name: string;
	emoji: string;
}

export class CreateCategoryUseCase {
	constructor(private categoryRepository: ICategoriesRepository) {}
	async execute({ name, emoji }: ICreateCategoryRequest) {
		const categoryAlreadyExists =
			await this.categoryRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new Error("Category already exists");
		}

		const category = await this.categoryRepository.create({
			name,
			emoji,
		});

		return { category };
	}
}
