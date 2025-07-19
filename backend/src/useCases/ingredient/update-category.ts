import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";

export interface IUpdateIngredientRequest {
	name: string;
	emoji: string;
}

export class UpdateIngredientsUseCase {
	constructor(private ingredientsRepository: IIngredientsRepository) {}
	async execute(
		ingredientId: string,
		{ name, emoji }: IUpdateIngredientRequest,
	) {
		const ingredient = await this.ingredientsRepository.update(ingredientId, {
			name,
			emoji,
		});

		return { ingredient };
	}
}
