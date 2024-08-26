/*
  Warnings:

  - You are about to drop the column `foodId` on the `File` table. All the data in the column will be lost.
  - Added the required column `images` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_foodId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "foodId";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "images" TEXT NOT NULL;
