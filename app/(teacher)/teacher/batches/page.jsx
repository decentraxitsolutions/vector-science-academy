import { getTeacherBatches } from "@/actions/teacher/batchActions";
import TeacherBatchesClient from "./_components/TeacherBatchesClient";

export const dynamic = "force-dynamic";

export default async function TeacherBatchesPage() {
    const batches = await getTeacherBatches();

    return <TeacherBatchesClient batches={batches} />;
}