import { getAdminSubjects } from "@/actions/admin/subjectActions";
import SubjectsClient from "./_components/SubjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminSubjectsPage() {
    const subjects = await getAdminSubjects();
    return <SubjectsClient initialSubjects={subjects} />;
}