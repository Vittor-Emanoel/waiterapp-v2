import type { ICategoryParams, ICategoryResponse } from "@/interfaces";
import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class CategoryService {
	constructor(private categoryRepository: ICategoriesRepository) {}

	async create({ name, emoji }: ICategoryParams): Promise<ICategoryResponse> {
		try {
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
		} catch (error) {
			throw new Error("Internal server error");
		}
	}
}
