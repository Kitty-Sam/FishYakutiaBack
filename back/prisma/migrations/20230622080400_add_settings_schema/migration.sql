-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "badge" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
