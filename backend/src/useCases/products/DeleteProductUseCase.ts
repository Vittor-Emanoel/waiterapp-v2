import { IProductsRepository } from "@/repositories/IProductsRepository";
import { Prisma } from "@prisma/client";

export interface IDeleteProductRequest {
  productId: string;
}

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ productId }: IDeleteProductRequest): Promise<void> {
    try {
      await this.productsRepository.delete(productId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Product not found");
      }
    }
  }
}
