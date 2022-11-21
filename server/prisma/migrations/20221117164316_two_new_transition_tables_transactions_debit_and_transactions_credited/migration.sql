/*
  Warnings:

  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAccountId_fkey";

-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "TransactionsDebited" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditedAccountId" TEXT NOT NULL,
    "debitedAccountId" TEXT NOT NULL,

    CONSTRAINT "TransactionsDebited_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionsCredited" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditedAccountId" TEXT NOT NULL,
    "debitedAccountId" TEXT NOT NULL,

    CONSTRAINT "TransactionsCredited_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionsDebited_id_key" ON "TransactionsDebited"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionsCredited_id_key" ON "TransactionsCredited"("id");

-- AddForeignKey
ALTER TABLE "TransactionsDebited" ADD CONSTRAINT "TransactionsDebited_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsCredited" ADD CONSTRAINT "TransactionsCredited_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
