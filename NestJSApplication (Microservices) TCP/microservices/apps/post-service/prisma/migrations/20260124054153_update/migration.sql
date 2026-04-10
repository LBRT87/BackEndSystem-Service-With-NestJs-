/*
  Warnings:

  - The primary key for the `content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `content` table. All the data in the column will be lost.
  - Added the required column `Content` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User_id` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` DROP PRIMARY KEY,
    DROP COLUMN `content`,
    DROP COLUMN `id`,
    DROP COLUMN `title`,
    DROP COLUMN `user_id`,
    ADD COLUMN `Content` VARCHAR(191) NOT NULL,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `Title` VARCHAR(191) NOT NULL,
    ADD COLUMN `User_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`Id`);
