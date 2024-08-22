/*
  Warnings:

  - A unique constraint covering the columns `[foodId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_foodId_key" ON "File"("foodId");
