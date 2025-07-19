/*
  Warnings:

  - You are about to drop the column `ingredient_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_ingredient_id_fkey";

-- DropIndex
DROP INDEX "products_category_id_ingredient_id_idx";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "ingredient_id";

-- CreateTable
CREATE TABLE "_IngredientToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToProduct_AB_unique" ON "_IngredientToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToProduct_B_index" ON "_IngredientToProduct"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
