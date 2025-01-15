/*
  Warnings:

  - You are about to drop the column `walletId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_walletId_fkey`;

-- AlterTable
ALTER TABLE `investment` MODIFY `sellingPrice` DOUBLE NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `walletId`;
