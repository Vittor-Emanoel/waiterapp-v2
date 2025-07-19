import type { Category, Prisma } from "@prisma/client";

export interface ICategoriesRepository {
	create(data: Prisma.CategoryCreateInput): Promise<Category>;
	findByName(name: string): Promise<Category | null>;
	getAll(): Promise<Category[]>;
	update(categoryId: string, data: Prisma.CategoryUpdateInput): Promise<void>;
	deleteOne(categoryId: string): Promise<void>;
  findById(id: string): Promise<Category | null>;
}
