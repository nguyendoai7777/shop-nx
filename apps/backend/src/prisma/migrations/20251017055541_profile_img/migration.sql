/*
  Warnings:

  - You are about to drop the column `avatart` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatart`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;
