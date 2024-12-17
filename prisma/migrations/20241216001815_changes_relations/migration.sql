/*
  Warnings:

  - You are about to drop the column `name` on the `nationality` table. All the data in the column will be lost.
  - You are about to drop the column `nationalityId` on the `nationality` table. All the data in the column will be lost.
  - Added the required column `brokerId` to the `investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `nationality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nationality` DROP FOREIGN KEY `nationality_nationalityId_fkey`;

-- AlterTable
ALTER TABLE `investment` ADD COLUMN `brokerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `nationality` DROP COLUMN `name`,
    DROP COLUMN `nationalityId`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `broker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nationalityId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `broker` ADD CONSTRAINT `broker_nationalityId_fkey` FOREIGN KEY (`nationalityId`) REFERENCES `nationality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investment` ADD CONSTRAINT `investment_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `broker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
