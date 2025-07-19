import type { Prisma, Product } from "@prisma/client";

export interface IProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
