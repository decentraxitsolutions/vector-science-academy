import { getBatchDetails, getSubjects } from "@/actions/teacher/contentActions";
import BatchDetailsClient from "./_components/BatchDetailsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TeacherBatchPage({ params }) {
    const { batchId } = await params;

    try {
        const [batch, subjects] = await Promise.all([
            getBatchDetails(batchId),
            getSubjects()
        ]);

        if (!batch) {
            redirect("/teacher/batches");
        }

        return <BatchDetailsClient batch={batch} subjects={subjects} />;
    } catch (error) {
        redirect("/teacher/batches");
    }
}