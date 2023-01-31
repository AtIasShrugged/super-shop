/*
  Warnings:

  - You are about to drop the `ProductModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProductModel";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
