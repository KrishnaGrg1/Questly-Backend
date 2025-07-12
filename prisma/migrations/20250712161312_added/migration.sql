/*
  Warnings:

  - Added the required column `calculatedAt` to the `CommunityLeaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `CommunityLeaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('Daily', 'Weekly', 'Monthly', 'OneTime');

-- AlterTable
ALTER TABLE "CommunityLeaderboard" ADD COLUMN     "calculatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "recurrence" TEXT,
ADD COLUMN     "type" "QuestType" NOT NULL DEFAULT 'Daily';

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "criteria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestTemplate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "GoalCategory" NOT NULL,
    "xpValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
