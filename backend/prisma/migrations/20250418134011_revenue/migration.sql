/*
  Warnings:

  - The values [Quiz] on the enum `LessonType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `totalEnrollments` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `totalRating` on the `Course` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonType_new" AS ENUM ('Video', 'Text');
ALTER TABLE "Lesson" ALTER COLUMN "lessonType" TYPE "LessonType_new" USING ("lessonType"::text::"LessonType_new");
ALTER TYPE "LessonType" RENAME TO "LessonType_old";
ALTER TYPE "LessonType_new" RENAME TO "LessonType";
DROP TYPE "LessonType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "totalEnrollments",
DROP COLUMN "totalRating";

-- CreateTable
CREATE TABLE "Revenue" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
