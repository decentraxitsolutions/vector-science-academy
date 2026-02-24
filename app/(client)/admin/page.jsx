import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { Users, BookOpen, IndianRupee } from "lucide-react";

export default async function AdminDashboard() {
  const user = await checkUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="pt-24 pb-12 min-h-screen container mx-auto px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Console</h1>
        <p className="text-zinc-400 mt-2">Manage academy operations, courses, and finances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Students</p>
              <h3 className="text-2xl font-bold text-white">0</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Active Courses</p>
              <h3 className="text-2xl font-bold text-white">0</h3>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
              <IndianRupee className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">Revenue</p>
              <h3 className="text-2xl font-bold text-white">₹0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}