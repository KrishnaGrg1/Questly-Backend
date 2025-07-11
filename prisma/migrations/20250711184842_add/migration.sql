/*
  Warnings:

  - Changed the type of `category` on the `Goal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GoalCategory" AS ENUM ('Fitness', 'MentalHealth', 'Education', 'Career', 'Programming', 'Lifestyle', 'Finance', 'Creativity', 'Social');

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "category",
ADD COLUMN     "category" "GoalCategory" NOT NULL;
