'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";

export async function getTeacherBatches() {
    const user = await checkUser();

    if (!user || user.role !== "TEACHER") {
        redirect("/");
    }

    // Find batches where this specific teacher is assigned
    const batches = await db.batch.findMany({
        where: {
            teacherBatches: {
                some: {
                    userId: user.id
                }
            }
        },
        include: {
            course: {
                select: { name: true }
            },
            _count: {
                select: { enrollments: true, lessons: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // CRITICAL: Serialize Dates to prevent Vercel 500 errors
    const serializedBatches = batches.map(batch => ({
        ...batch,
        startDate: batch.startDate ? batch.startDate.toISOString() : null,
        endDate: batch.endDate ? batch.endDate.toISOString() : null,
        createdAt: batch.createdAt.toISOString(),
        updatedAt: batch.updatedAt.toISOString(),
    }));

    return serializedBatches;
}