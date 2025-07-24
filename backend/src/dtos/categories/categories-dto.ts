export interface CreateCategoryDTO {
  name: string;
  emoji: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
