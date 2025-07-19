/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `emoji` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ingredient_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_ingredient_id_fkey";

-- DropIndex
DROP INDEX "ingredients_name_key";

-- DropIndex
DROP INDEX "products_category_id_ingredient_id_idx";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "createdAt",
DROP COLUMN "emoji",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id",
DROP COLUMN "ingredient_id",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "productId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateTable
CREATE TABLE "_ProductIngredients" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductIngredients_AB_unique" ON "_ProductIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductIngredients_B_index" ON "_ProductIngredients"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductIngredients" ADD CONSTRAINT "_ProductIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
