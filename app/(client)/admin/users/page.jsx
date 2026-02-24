import { getAdminUsers, getActiveBatches } from "@/actions/admin/userActions";
import AdminUsersClient from "./_components/AdminUsersClient";

export default async function AdminUsersPage() {
  const [users, activeBatches] = await Promise.all([
    getAdminUsers(),
    getActiveBatches()
  ]);

  return <AdminUsersClient initialUsers={users} activeBatches={activeBatches} />;
}