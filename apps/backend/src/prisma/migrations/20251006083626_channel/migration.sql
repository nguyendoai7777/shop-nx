/*
  Warnings:

  - You are about to drop the `donation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rewardredemption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_donationId_fkey`;

-- DropForeignKey
ALTER TABLE `rewardredemption` DROP FOREIGN KEY `RewardRedemption_rewardId_fkey`;

-- DropForeignKey
ALTER TABLE `rewardredemption` DROP FOREIGN KEY `RewardRedemption_userId_fkey`;

-- DropIndex
DROP INDEX `User_channel_key` ON `user`;

-- DropTable
DROP TABLE `donation`;

-- DropTable
DROP TABLE `notification`;

-- DropTable
DROP TABLE `reward`;

-- DropTable
DROP TABLE `rewardredemption`;

-- CreateTable
CREATE TABLE `ExternalLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `channelId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `shortname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Channel_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE FULLTEXT INDEX `User_firstname_lastname_email_channel_idx` ON `User`(`firstname`, `lastname`, `email`, `channel`);

-- AddForeignKey
ALTER TABLE `ExternalLink` ADD CONSTRAINT `ExternalLink_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
