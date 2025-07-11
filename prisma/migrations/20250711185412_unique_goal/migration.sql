/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quest_userId_key" ON "Quest"("userId");
