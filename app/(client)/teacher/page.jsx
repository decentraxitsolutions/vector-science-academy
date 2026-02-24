import { getTeacherDashboardStats } from "@/actions/teacher/dashboardActions";
import TeacherDashboardClient from "./_components/TeacherDashboardClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TeacherDashboardPage() {
  try {
    const stats = await getTeacherDashboardStats();
    return <TeacherDashboardClient stats={stats} />;
  } catch (err) {
    redirect("/sign-in");
  }
}