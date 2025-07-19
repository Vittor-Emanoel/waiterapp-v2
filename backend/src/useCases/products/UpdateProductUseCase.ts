import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";
import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";
import type { IProductsRepository } from "@/repositories/IProductsRepository";
import { Product } from "@prisma/client";

export interface IUpdateProductRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  ingredientIds: string[];
}

export class UpdateProductUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private categoriesRepository: ICategoriesRepository,
    private ingredientsRepository: IIngredientsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    price,
    imageUrl,
    categoryId,
    ingredientIds,
  }: IUpdateProductRequest): Promise<{ product: Product }> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (name !== product.name) {
      const existing = await this.productsRepository.findByName(name);
      if (existing) {
        throw new Error("A product with this name already exists");
      }
    }

    const updateData = {
      name,
      description,
      price,
      imageUrl,
      category: {
        connect: { id: categoryId },
      },
      ingredients: {
        set: ingredientIds.map((id) => ({ id })),
      },
    };

    try {
      const updated = await this.productsRepository.update(id, updateData);
      return { product: updated };
    } catch (err) {
      throw err;
    }
  }
}
