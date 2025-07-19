/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "ingredient_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_IngredientToProduct";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "products_category_id_ingredient_id_idx" ON "products"("category_id", "ingredient_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
