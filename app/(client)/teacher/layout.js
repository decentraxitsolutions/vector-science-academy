import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import TeacherSidebarClient from "./_components/TeacherSidebarClient";

export const dynamic = "force-dynamic";

export default async function TeacherLayout({ children }) {
  const user = await checkUser();

  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/teacher")}`);
  }

  if (user.role !== "TEACHER") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex pt-16">
      <TeacherSidebarClient />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}