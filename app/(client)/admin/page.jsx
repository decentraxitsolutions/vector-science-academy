import { getAdminDashboardStats } from "@/actions/admin/dashboardActions";
import AdminDashboardClient from "./_components/AdminDashboardClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  try {
    const stats = await getAdminDashboardStats();
    return <AdminDashboardClient stats={stats} />;
  } catch (err) {
    redirect("/sign-in");
  }
}