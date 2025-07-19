import { IProductsRepository } from "@/repositories/IProductsRepository";

export interface IDeleteProductRequest {
  productId: string;
}

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ productId }: IDeleteProductRequest): Promise<void> {
    const existingProduct = await this.productsRepository.findById(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    await this.productsRepository.delete(productId);
  }
}
