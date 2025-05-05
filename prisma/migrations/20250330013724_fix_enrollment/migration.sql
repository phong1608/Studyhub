/*
  Warnings:

  - The values [Organization] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `organizeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('Student', 'Instructor');
ALTER TABLE "User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'Student';
COMMIT;

-- DropForeignKey
ALTER TABLE "OrganizationCourse" DROP CONSTRAINT "OrganizationCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationCourse" DROP CONSTRAINT "OrganizationCourse_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_userId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "organizeId";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "OrganizationCourse";

-- DropTable
DROP TABLE "UserOrganization";
