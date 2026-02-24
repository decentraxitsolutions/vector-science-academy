import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { Video, Users, FileText } from "lucide-react";

export default async function TeacherDashboard() {
  const user = await checkUser();

  if (!user || user.role !== "TEACHER") {
    redirect("/");
  }

  return (
    <div className="pt-24 pb-12 min-h-screen container mx-auto px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Teacher Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome back, {user.firstName}. Manage your batches and uploads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-full bg-blue-500/20 text-blue-400">
              <Video className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload Lecture</h3>
              <p className="text-sm text-zinc-400 mt-1">Direct upload to Mux</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-full bg-amber-500/20 text-amber-400">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">My Batches</h3>
              <p className="text-sm text-zinc-400 mt-1">View student progress</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-full bg-rose-500/20 text-rose-400">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Assignments</h3>
              <p className="text-sm text-zinc-400 mt-1">Grade recent tests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}