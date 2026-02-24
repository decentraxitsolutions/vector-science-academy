import { getAdminCourses } from "@/actions/admin/courseActions";
import AdminCoursesClient from "./_components/AdminCoursesClient";

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();

  return <AdminCoursesClient courses={courses} />;
}