-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "days" TEXT,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'Hinglish',
ADD COLUMN     "maxStudents" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "timeSlot" TEXT;
