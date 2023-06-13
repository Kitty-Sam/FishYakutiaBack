-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userPhone" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    "foodCount" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
