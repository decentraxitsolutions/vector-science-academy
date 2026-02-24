'use server';

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";

export async function getAdminSubjects() {
    const user = await checkUser();
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    return await db.subject.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function createSubject(formData) {
    const user = await checkUser();
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    const name = formData.get("name");
    if (!name) return { error: "Name is required" };

    await db.subject.create({
        data: { name }
    });

    revalidatePath("/admin/subjects");
    revalidatePath("/teacher/batches/[batchId]", "page"); // Refresh teacher dropdowns
    return { success: true };
}

export async function deleteSubject(id) {
    const user = await checkUser();
    if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

    await db.subject.delete({
        where: { id }
    });

    revalidatePath("/admin/subjects");
    return { success: true };
}