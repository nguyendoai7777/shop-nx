/*
  Warnings:

  - A unique constraint covering the columns `[channel]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `channel` VARCHAR(191) NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `User_channel_key` ON `User`(`channel`);
