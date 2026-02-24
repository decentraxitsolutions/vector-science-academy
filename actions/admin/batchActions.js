'use server';

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminBatches() {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const batches = await db.batch.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      course: {
        select: { name: true, isStandalone: true }
      },
      _count: {
        select: { enrollments: true, lessons: true, teacherBatches: true }
      }
    }
  });

  return batches;
}

export async function getCoursesForDropdown() {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const courses = await db.course.findMany({
    where: { isStandalone: false },
    select: { id: true, name: true },
    orderBy: { createdAt: 'desc' }
  });

  return courses;
}

export async function createBatch(data) {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  await db.batch.create({
    data: {
      name: data.name,
      courseId: data.courseId,
      maxStudents: parseInt(data.maxStudents || "100"),
      language: data.language,
      timeSlot: data.timeSlot,
      days: data.days,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      isActive: true
    }
  });

  revalidatePath("/admin/batches");
  return { success: true };
}

export async function toggleBatchStatus(batchId, currentStatus) {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  await db.batch.update({
    where: { id: batchId },
    data: { isActive: !currentStatus }
  });

  revalidatePath("/admin/batches");
  return { success: true };
}