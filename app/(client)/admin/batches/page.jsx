import { getAdminBatches, getCoursesForDropdown } from "@/actions/admin/batchActions";
import AdminBatchesClient from "./_components/AdminBatchesClient";
import { redirect } from "next/navigation";

// these pages rely on an authenticated admin user, so they must be rendered
// at request time and not prerendered during the build. forcing dynamic
// rendering stops Next.js from trying to statically generate the route and
// avoids the "Unauthorized" error during the build step.
export const dynamic = "force-dynamic";

export default async function AdminBatchesPage() {
  const [batches, courses] = await Promise.all([
    getAdminBatches(),
    getCoursesForDropdown()
  ]);

  return <AdminBatchesClient initialBatches={batches} courses={courses} />;
}