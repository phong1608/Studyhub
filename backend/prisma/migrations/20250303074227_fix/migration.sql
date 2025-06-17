/*
  Warnings:

  - The values [Imtermediate] on the enum `CourseLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseLevel_new" AS ENUM ('Beginner', 'Intermediate', 'Advanced');
ALTER TABLE "Course" ALTER COLUMN "level" TYPE "CourseLevel_new" USING ("level"::text::"CourseLevel_new");
ALTER TYPE "CourseLevel" RENAME TO "CourseLevel_old";
ALTER TYPE "CourseLevel_new" RENAME TO "CourseLevel";
DROP TYPE "CourseLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;
