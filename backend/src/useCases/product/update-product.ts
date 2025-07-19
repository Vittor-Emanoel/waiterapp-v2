import type { ICategoriesRepository } from "@/repositories/ICategoriesRepository";
import type { IIngredientsRepository } from "@/repositories/IIngredientsRepository";
import type { IProductsRepository } from "@/repositories/IProductsRepository";
import { Product } from "@prisma/client";

export interface IUpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string;
  ingredientIds?: string[];
}

export class UpdateProductUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private categoriesRepository: ICategoriesRepository,
    private ingredientsRepository: IIngredientsRepository
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

    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    // Se um novo nome foi fornecido, verificar se já existe outro produto com esse nome
    if (name && name !== existingProduct.name) {
      const productWithSameName = await this.productsRepository.findByName(name);
      if (productWithSameName) {
        throw new Error("A product with this name already exists");
      }
    }

    // Verificar se a categoria existe (se foi fornecida)
    if (categoryId) {
      const categoryExists = await this.categoriesRepository.findById(categoryId);
      if (!categoryExists) {
        throw new Error("Category not found");
      }
    }

    // Verificar se todos os ingredientes existem (se foram fornecidos)
    if (ingredientIds && ingredientIds.length > 0) {
      const existingIngredients = await this.ingredientsRepository.findByIds(ingredientIds);

      if (existingIngredients.length !== ingredientIds.length) {
        throw new Error("One or more ingredients not found");
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (categoryId) {
      updateData.category = {
        connect: {
          id: categoryId,
        }
      };
    }

    if (ingredientIds !== undefined) {
      updateData.ingredients = {
        set: ingredientIds.map((id) => ({ id }))
      };
    }

    const product = await this.productsRepository.update(id, updateData);

    return { product };
  }
}
