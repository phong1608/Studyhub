/*
  Warnings:

  - You are about to drop the column `summarize` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "summarize";

-- AlterTable
ALTER TABLE "LessonVideo" ADD COLUMN     "summarize" TEXT;
