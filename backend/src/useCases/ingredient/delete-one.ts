import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";

export class DeleteOneIngredientsUseCase {
	constructor(private ingredientsRepository: IIngredientsRepository) {}
	async execute(ingredientsId: string) {
		const ingredients =
			await this.ingredientsRepository.deleteOne(ingredientsId);

		return { ingredients };
	}
}
