/*
  Warnings:

  - A unique constraint covering the columns `[name,value]` on the table `ProductField` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductField_name_value_key" ON "ProductField"("name", "value");
