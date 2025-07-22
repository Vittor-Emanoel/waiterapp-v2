import { ICategoriesRepository } from "@/repositories/ICategoriesRepository";
import { IIngredientsRepository } from "@/repositories/IIngredientsRepository";
import type { IProductsRepository } from "@/repositories/IProductsRepository";
import { Product } from "@prisma/client";

export interface ICreateProductRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  ingredientIds: string[];
}

/**
 * Refactor!
 */
export class CreateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly categoriesRepository: ICategoriesRepository,
    private readonly ingredientsRepository: IIngredientsRepository
  ) {}

  async execute({
    name,
    description,
    price,
    imageUrl,
    categoryId,
    ingredientIds,
  }: ICreateProductRequest): Promise<{ product: Product }> {
    const existing = await this.productsRepository.findByName(name);
    if (existing) {
      throw new Error("Product already exists");
    }

    const categoryExists = await this.categoriesRepository.findById(categoryId);

    if (!categoryExists) {
      throw new Error("Category not found");
    }
    if (ingredientIds.length > 0) {
      const existingIngredients = await this.ingredientsRepository.findByIds(
        ingredientIds
      );

      if (existingIngredients.length !== ingredientIds.length) {
        throw new Error("One or more ingredients not found");
      }
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
      imageUrl,
      category: {
        connect: {
          id: categoryId,
        },
      },
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
    });

    return { product };
  }
}
