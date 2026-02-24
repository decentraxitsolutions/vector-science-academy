// 'use server';

// import { db } from "@/lib/prisma";
// import { checkUser } from "@/lib/checkUser";
// import { revalidatePath } from "next/cache";

// export async function getBatchDetails(batchId) {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     // Verify the teacher is actually assigned to this batch
//     const isAssigned = await db.teacherBatch.findUnique({
//         where: {
//             userId_batchId: { userId: user.id, batchId: batchId }
//         }
//     });

//     if (!isAssigned) throw new Error("You do not have access to this batch.");

//     const batch = await db.batch.findUnique({
//         where: { id: batchId },
//         include: {
//             course: { select: { name: true } },
//             _count: { select: { enrollments: true } }, // Fetching real student count
//             lessons: {
//                 where: { teacherId: user.id },
//                 include: { subject: true },
//                 orderBy: { createdAt: 'desc' }
//             },
//             materials: {
//                 where: { teacherId: user.id },
//                 include: { subject: true },
//                 orderBy: { createdAt: 'desc' }
//             }
//         }
//     });

//     if (!batch) return null;

//     // Safely serialize dates to prevent Next.js Server-to-Client hydration crashes
//     return {
//         ...batch,
//         startDate: batch.startDate ? batch.startDate.toISOString() : null,
//         endDate: batch.endDate ? batch.endDate.toISOString() : null,
//         createdAt: batch.createdAt.toISOString(),
//         updatedAt: batch.updatedAt.toISOString(),
//         lessons: batch.lessons.map(lesson => ({
//             ...lesson,
//             createdAt: lesson.createdAt.toISOString(),
//             updatedAt: lesson.updatedAt.toISOString()
//         })),
//         materials: batch.materials.map(material => ({
//             ...material,
//             createdAt: material.createdAt.toISOString(),
//             updatedAt: material.updatedAt.toISOString()
//         }))
//     };
// }

// export async function getSubjects() {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     return await db.subject.findMany({
//         orderBy: { name: 'asc' }
//     });
// }

// export async function createLesson(data) {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     await db.lesson.create({
//         data: {
//             title: data.title,
//             description: data.description,
//             playbackId: data.playbackId,
//             isFreePreview: data.isFreePreview,
//             batchId: data.batchId,
//             subjectId: data.subjectId,
//             teacherId: user.id
//         }
//     });

//     revalidatePath(`/teacher/batches/${data.batchId}`);
//     return { success: true };
// }

// export async function createStudyMaterial(data) {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     await db.studyMaterial.create({
//         data: {
//             title: data.title,
//             description: data.description,
//             type: "PDF",
//             fileUrl: data.fileUrl,
//             size: data.size,
//             pages: parseInt(data.pages || "0"),
//             isFreePreview: data.isFreePreview,
//             batchId: data.batchId,
//             subjectId: data.subjectId,
//             teacherId: user.id
//         }
//     });

//     revalidatePath(`/teacher/batches/${data.batchId}`);
//     return { success: true };
// }

// export async function createSubjectQuick(name) {
//     const user = await checkUser();
//     if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

//     const trimmedName = name.trim();
//     if (!trimmedName) throw new Error("Subject name cannot be empty");

//     // Check if it already exists (case-insensitive) to prevent duplicates
//     const existingSubject = await db.subject.findFirst({
//         where: {
//             name: {
//                 equals: trimmedName,
//                 mode: 'insensitive'
//             }
//         }
//     });

//     if (existingSubject) {
//         return existingSubject; // If it exists, just return it so we can auto-select it
//     }

//     // Otherwise, create the new subject
//     const newSubject = await db.subject.create({
//         data: { name: trimmedName }
//     });

//     revalidatePath("/teacher/batches/[batchId]", "page");
//     return newSubject;
// }

'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";

export async function getBatchDetails(batchId) {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    const isAssigned = await db.teacherBatch.findUnique({
        where: {
            userId_batchId: { userId: user.id, batchId: batchId }
        }
    });

    if (!isAssigned) throw new Error("You do not have access to this batch.");

    const batch = await db.batch.findUnique({
        where: { id: batchId },
        include: {
            course: { select: { name: true } },
            _count: { select: { enrollments: true } },
            lessons: {
                where: { teacherId: user.id },
                include: { subject: true },
                orderBy: { createdAt: 'desc' }
            },
            materials: {
                where: { teacherId: user.id },
                include: { subject: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!batch) return null;

    return {
        ...batch,
        startDate: batch.startDate ? batch.startDate.toISOString() : null,
        endDate: batch.endDate ? batch.endDate.toISOString() : null,
        createdAt: batch.createdAt.toISOString(),
        updatedAt: batch.updatedAt.toISOString(),
        lessons: batch.lessons.map(lesson => ({
            ...lesson,
            createdAt: lesson.createdAt.toISOString(),
            updatedAt: lesson.updatedAt.toISOString()
        })),
        materials: batch.materials.map(material => ({
            ...material,
            createdAt: material.createdAt.toISOString(),
            updatedAt: material.updatedAt.toISOString()
        }))
    };
}

export async function getSubjects() {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    return await db.subject.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function createSubjectQuick(name) {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    const trimmedName = name.trim();
    if (!trimmedName) throw new Error("Subject name cannot be empty");

    const existingSubject = await db.subject.findFirst({
        where: {
            name: {
                equals: trimmedName,
                mode: 'insensitive'
            }
        }
    });

    if (existingSubject) return existingSubject;

    const newSubject = await db.subject.create({
        data: { name: trimmedName }
    });

    revalidatePath("/teacher/batches/[batchId]", "page");
    return newSubject;
}

export async function createLesson(data) {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    await db.lesson.create({
        data: {
            title: data.title,
            description: data.description,
            playbackId: data.playbackId,
            isFreePreview: data.isFreePreview,
            batchId: data.batchId,
            subjectId: data.subjectId,
            teacherId: user.id
        }
    });

    revalidatePath(`/teacher/batches/${data.batchId}`);
    return { success: true };
}

export async function createStudyMaterial(data) {
    const user = await checkUser();
    if (!user || user.role !== "TEACHER") throw new Error("Unauthorized");

    await db.studyMaterial.create({
        data: {
            title: data.title,
            description: data.description,
            type: "PDF",
            fileUrl: data.fileUrl,
            size: data.size,
            pages: parseInt(data.pages || "0"),
            isFreePreview: data.isFreePreview,
            batchId: data.batchId,
            subjectId: data.subjectId,
            teacherId: user.id
        }
    });

    revalidatePath(`/teacher/batches/${data.batchId}`);
    return { success: true };
}