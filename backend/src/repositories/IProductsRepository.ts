import {
  CreateProductDTO,
  UpdateProductDTO,
} from "@/dtos/products/products-dto";
import type { Product } from "@prisma/client";

export interface IProductsRepository {
  create(data: CreateProductDTO): Promise<Product>;
  getAll(): Promise<Product[]>;
  update(productId: string, data: UpdateProductDTO): Promise<Product>;
  delete(productId: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
}
