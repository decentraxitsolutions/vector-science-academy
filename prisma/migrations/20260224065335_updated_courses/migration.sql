/*
  Warnings:

  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "duration",
ADD COLUMN     "courseType" TEXT,
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStandalone" BOOLEAN NOT NULL DEFAULT false;
