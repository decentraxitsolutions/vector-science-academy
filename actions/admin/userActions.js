'use server';

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminUsers() {
  const admin = await checkUser();
  if (!admin || admin.role !== "ADMIN") throw new Error("Unauthorized");

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      teacherBatches: {
        include: {
          batch: {
            select: { id: true, name: true, course: { select: { name: true } } }
          }
        }
      }
    }
  });

  return users;
}

export async function getActiveBatches() {
  const admin = await checkUser();
  if (!admin || admin.role !== "ADMIN") throw new Error("Unauthorized");

  return await db.batch.findMany({
    where: { isActive: true },
    select: { id: true, name: true, course: { select: { name: true } } },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateUserRole(userId, newRole) {
  const admin = await checkUser();
  if (!admin || admin.role !== "ADMIN") throw new Error("Unauthorized");

  // If demoting a teacher to student, remove their batch assignments
  if (newRole !== "TEACHER") {
    await db.teacherBatch.deleteMany({
      where: { userId }
    });
  }

  await db.user.update({
    where: { id: userId },
    data: { role: newRole }
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function assignTeacherToBatch(userId, batchId) {
  const admin = await checkUser();
  if (!admin || admin.role !== "ADMIN") throw new Error("Unauthorized");

  await db.teacherBatch.create({
    data: { userId, batchId }
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function removeTeacherFromBatch(userId, batchId) {
  const admin = await checkUser();
  if (!admin || admin.role !== "ADMIN") throw new Error("Unauthorized");

  await db.teacherBatch.delete({
    where: {
      userId_batchId: { userId, batchId }
    }
  });

  revalidatePath("/admin/users");
  return { success: true };
}