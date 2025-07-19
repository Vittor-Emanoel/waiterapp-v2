/*
  Warnings:

  - You are about to drop the column `description` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ingredients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emoji` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "emoji" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "description",
DROP COLUMN "imageUrl",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emoji" TEXT NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
