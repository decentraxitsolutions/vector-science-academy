import { getAdminBatches, getCoursesForDropdown } from "@/actions/admin/batchActions";
import AdminBatchesClient from "./_components/AdminBatchesClient";

export default async function AdminBatchesPage() {
  const [batches, courses] = await Promise.all([
    getAdminBatches(),
    getCoursesForDropdown()
  ]);

  return <AdminBatchesClient initialBatches={batches} courses={courses} />;
}