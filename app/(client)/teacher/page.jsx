import { getTeacherDashboardStats } from "@/actions/teacher/dashboardActions";
import TeacherDashboardClient from "./_components/TeacherDashboardClient";

export default async function TeacherDashboardPage() {
  const stats = await getTeacherDashboardStats();

  return <TeacherDashboardClient stats={stats} />;
}