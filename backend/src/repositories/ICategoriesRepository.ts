import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/dtos/categories/categories-dto";
import type { Category } from "@prisma/client";

export interface ICategoriesRepository {
  create(data: CreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  getAll(): Promise<Category[]>;
  update(categoryId: string, data: UpdateCategoryDTO): Promise<void>;
  delete(categoryId: string): Promise<void>;
  findById(id: string): Promise<Category | null>;
}
