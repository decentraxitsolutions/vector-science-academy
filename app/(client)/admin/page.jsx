import { getAdminDashboardStats } from "@/actions/admin/dashboardActions";
import AdminDashboardClient from "./_components/AdminDashboardClient";

export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();

  return <AdminDashboardClient stats={stats} />;
}