import { Decimal } from "@prisma/client/runtime/library";

export interface CreateProductDTO {
  name: string;
  description: string;
  price: Decimal;
  imageUrl: string;
  category: string;
  ingredientIds: string[];
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
