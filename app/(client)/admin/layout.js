import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import AdminSidebarClient from "./_components/AdminSidebarClient";

export default async function AdminLayout({ children }) {
  const user = await checkUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex pt-16">
      <AdminSidebarClient />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}