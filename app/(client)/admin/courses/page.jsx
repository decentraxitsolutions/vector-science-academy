import { getAdminCourses } from "@/actions/admin/courseActions";
import AdminCoursesClient from "./_components/AdminCoursesClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  try {
    const courses = await getAdminCourses();
    return <AdminCoursesClient courses={courses} />;
  } catch (err) {
    redirect("/sign-in");
  }
}