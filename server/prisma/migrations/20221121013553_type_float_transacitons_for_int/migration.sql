/*
  Warnings:

  - You are about to alter the column `value` on the `TransactionsCredited` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `value` on the `TransactionsDebited` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TransactionsCredited" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionsDebited" ALTER COLUMN "value" SET DATA TYPE INTEGER;
