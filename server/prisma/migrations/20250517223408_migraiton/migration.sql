/*
  Warnings:

  - You are about to drop the column `userId` on the `SlackThread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SlackThread" DROP CONSTRAINT "SlackThread_userId_fkey";

-- AlterTable
ALTER TABLE "SlackThread" DROP COLUMN "userId";
