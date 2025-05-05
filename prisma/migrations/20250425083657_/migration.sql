/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sectionId,position]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,position]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderCourse" DROP CONSTRAINT "OrderCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "OrderCourse" DROP CONSTRAINT "OrderCourse_orderId_fkey";

-- DropIndex
DROP INDEX "Lesson_position_key";

-- DropIndex
DROP INDEX "Section_position_key";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderCourse";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_sectionId_position_key" ON "Lesson"("sectionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Section_courseId_position_key" ON "Section"("courseId", "position");
