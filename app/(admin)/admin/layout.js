import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import AdminSidebarClient from "./_components/AdminSidebarClient";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const user = await checkUser();

  // unauthenticated users go to sign-in (Clerk will send them back)
  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/admin")}`);
  }

  // authenticated but not an admin should not stay here
  if (user.role !== "ADMIN") {
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