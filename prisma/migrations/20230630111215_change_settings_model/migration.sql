/*
  Warnings:

  - You are about to drop the column `badge` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[settingsId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "settingsId" INTEGER;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "badge",
ADD COLUMN     "imageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "File_settingsId_key" ON "File"("settingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_imageId_key" ON "Settings"("imageId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
