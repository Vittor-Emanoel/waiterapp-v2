export interface CreateIngredientDTO {
  name: string;
  emoji: string;
}

export type UpdateIngredientDTO = Partial<CreateIngredientDTO>;
