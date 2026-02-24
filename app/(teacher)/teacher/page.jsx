import { getTeacherDashboardStats } from "@/actions/teacher/dashboardActions";
import TeacherDashboardClient from "./_components/TeacherDashboardClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TeacherDashboardPage() {
  const stats = await getTeacherDashboardStats();
  return <TeacherDashboardClient stats={stats} />;
}