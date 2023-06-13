/*
  Warnings:

  - You are about to drop the column `foodCount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `foodId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_foodId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "foodCount",
DROP COLUMN "foodId",
ADD COLUMN     "totalAmount" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrderFood" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "foodCount" INTEGER NOT NULL,

    CONSTRAINT "OrderFood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
