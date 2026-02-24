'use server';

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

export async function getAdminDashboardStats() {
  const user = await checkUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  const [totalStudents, activeCourses, totalBatches, revenueData] = await Promise.all([
    db.user.count({ where: { role: "STUDENT" } }),
    db.course.count({ where: { isPublished: true } }),
    db.batch.count({ where: { isActive: true } }),
    db.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" }
    })
  ]);

  const recentEnrollments = await db.enrollment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { firstName: true, lastName: true, email: true, imageUrl: true } },
      batch: { select: { name: true, course: { select: { name: true } } } }
    }
  });

  return {
    totalStudents,
    activeCourses,
    totalBatches,
    totalRevenue: revenueData._sum.amount || 0,
    recentEnrollments
  };
}