'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

export async function getTeacherDashboardStats() {
  const user = await checkUser();
  if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

  // Fetch the teacher's assigned batches
  const teacherBatches = await db.teacherBatch.findMany({
    where: { userId: user.id },
    include: {
      batch: {
        include: {
          _count: {
            select: { enrollments: true }
          }
        }
      }
    }
  });

  const activeBatchesCount = teacherBatches.filter(tb => tb.batch.isActive).length;
  
  // Calculate total unique students across all their batches
  const totalStudents = teacherBatches.reduce((acc, curr) => acc + curr.batch._count.enrollments, 0);

  const totalLessons = await db.lesson.count({
    where: { teacherId: user.id }
  });

  const totalMaterials = await db.studyMaterial.count({
    where: { teacherId: user.id }
  });

  return {
    activeBatchesCount,
    totalStudents,
    totalLessons,
    totalMaterials,
    firstName: user.firstName
  };
}