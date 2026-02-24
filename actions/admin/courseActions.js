'use server';

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminCourses() {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const courses = await db.course.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { batches: true, payments: true }
      }
    }
  });

  return courses;
}

export async function createCourse(data) {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const fee = data.isFree ? 0 : parseFloat(data.fee || "0");

  const curriculum = data.curriculum.split('\n').filter(c => c.trim() !== '');
  const features = data.features.split('\n').filter(f => f.trim() !== '');

  await db.course.create({
    data: {
      name: data.name,
      slug,
      category: data.category,
      isFree: data.isFree,
      isStandalone: data.isStandalone,
      expiryDate: data.isStandalone && data.expiryDate ? new Date(data.expiryDate) : null,
      fee,
      description: data.description,
      fullDescription: data.fullDescription,
      schedule: data.schedule || "Flexible",
      eligibility: data.eligibility,
      curriculum,
      features,
      isPublished: false
    }
  });

  revalidatePath("/admin/courses");
  return { success: true };
}
// 
export async function toggleCoursePublish(courseId, currentStatus) {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  await db.course.update({
    where: { id: courseId },
    data: { isPublished: !currentStatus }
  });

  revalidatePath("/admin/courses");
  return { success: true };
}