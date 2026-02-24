// 'use server';

// import { checkUser } from "@/lib/checkUser";
// import { db } from "@/lib/prisma";

// export async function getAdminDashboardStats() {
//   const user = await checkUser();
//   if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

//   const [totalStudents, activeCourses, totalBatches, revenueData] = await Promise.all([
//     db.user.count({ where: { role: "STUDENT" } }),
//     db.course.count({ where: { isPublished: true } }),
//     db.batch.count({ where: { isActive: true } }),
//     db.payment.aggregate({
//       _sum: { amount: true },
//       where: { status: "SUCCESS" }
//     })
//   ]);

//   const recentEnrollments = await db.enrollment.findMany({
//     take: 5,
//     orderBy: { createdAt: 'desc' },
//     include: {
//       user: { select: { firstName: true, lastName: true, email: true, imageUrl: true } },
//       batch: { select: { name: true, course: { select: { name: true } } } }
//     }
//   });

//   return {
//     totalStudents,
//     activeCourses,
//     totalBatches,
//     totalRevenue: revenueData._sum.amount || 0,
//     recentEnrollments
//   };
// }

'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";

export async function getAdminDashboardStats() {
  const user = await checkUser();
  
  // Use redirect instead of throwing an error to prevent SSR crashes
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const [totalStudents, activeCourses, totalBatches, revenueData] = await Promise.all([
    db.user.count({ where: { role: "STUDENT" } }),
    db.course.count({ where: { isPublished: true } }),
    db.batch.count({ where: { isActive: true } }),
    db.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" }
    })
  ]);

  const recentEnrollmentsRaw = await db.enrollment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { firstName: true, lastName: true, email: true, imageUrl: true } },
      batch: { select: { name: true, course: { select: { name: true } } } }
    }
  });

  // CRITICAL PRODUCTION FIX: Convert Prisma Date objects to strings before passing to Client
  const serializedEnrollments = recentEnrollmentsRaw.map(enrollment => ({
    ...enrollment,
    createdAt: enrollment.createdAt.toISOString(),
    updatedAt: enrollment.updatedAt.toISOString(),
    accessEnd: enrollment.accessEnd ? enrollment.accessEnd.toISOString() : null
  }));

  return {
    totalStudents,
    activeCourses,
    totalBatches,
    totalRevenue: revenueData._sum?.amount || 0,
    recentEnrollments: serializedEnrollments
  };
}