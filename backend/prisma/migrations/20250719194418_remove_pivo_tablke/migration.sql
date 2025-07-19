/*
  Warnings:

  - You are about to drop the `ProductIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductIngredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_B_fkey";

-- DropTable
DROP TABLE "ProductIngredient";

-- DropTable
DROP TABLE "_ProductIngredients";

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
