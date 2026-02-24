/*
  Warnings:

  - You are about to drop the column `price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculum` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eligibility` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `features` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullDescription` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'PDF', 'ARTICLE', 'LINK');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "curriculum" JSONB NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "eligibility" TEXT NOT NULL,
ADD COLUMN     "features" JSONB NOT NULL,
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fullDescription" TEXT NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "schedule" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "isFreePreview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subjectId" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "courseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "TeacherBatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "accessEnd" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyMaterial" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ContentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "size" TEXT,
    "pages" INTEGER,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'INTERMEDIATE',
    "isFreePreview" BOOLEAN NOT NULL DEFAULT false,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "batchId" TEXT,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudyMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveClass" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meetingLink" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "batchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "batchId" TEXT,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "marks" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "watchedSecs" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doubt" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doubt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoubtReply" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "doubtId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoubtReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherBatch_userId_batchId_key" ON "TeacherBatch"("userId", "batchId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_batchId_key" ON "Enrollment"("userId", "batchId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WatchProgress_userId_lessonId_key" ON "WatchProgress"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- AddForeignKey
ALTER TABLE "TeacherBatch" ADD CONSTRAINT "TeacherBatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherBatch" ADD CONSTRAINT "TeacherBatch_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveClass" ADD CONSTRAINT "LiveClass_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchProgress" ADD CONSTRAINT "WatchProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchProgress" ADD CONSTRAINT "WatchProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doubt" ADD CONSTRAINT "Doubt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doubt" ADD CONSTRAINT "Doubt_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoubtReply" ADD CONSTRAINT "DoubtReply_doubtId_fkey" FOREIGN KEY ("doubtId") REFERENCES "Doubt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoubtReply" ADD CONSTRAINT "DoubtReply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
