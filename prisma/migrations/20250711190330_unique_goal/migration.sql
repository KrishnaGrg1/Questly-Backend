/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Quest_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Goal_userId_key" ON "Goal"("userId");
