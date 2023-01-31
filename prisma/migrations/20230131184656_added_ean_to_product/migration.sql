/*
  Warnings:

  - A unique constraint covering the columns `[ean]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ean` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ean" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_ean_key" ON "Product"("ean");
