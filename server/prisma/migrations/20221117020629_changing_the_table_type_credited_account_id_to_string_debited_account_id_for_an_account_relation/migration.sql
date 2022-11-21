/*
  Warnings:

  - You are about to drop the column `debitedAccountId` on the `Transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "debitedAccountId",
ALTER COLUMN "creditedAccountId" SET DATA TYPE TEXT;
