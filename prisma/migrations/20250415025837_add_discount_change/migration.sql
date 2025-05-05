/*
  Warnings:

  - Added the required column `type` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountStatus" AS ENUM ('Active', 'Expired', 'Disabled');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('Percentage', 'Fixed');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "totalEnrollments" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "status" "DiscountStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN     "type" "DiscountType" NOT NULL;
