import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";
import { PlayCircle, Award, Clock } from "lucide-react";

export default async function StudentPortal() {
  const user = await checkUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="pt-24 pb-12 min-h-screen container mx-auto px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Learning</h1>
        <p className="text-zinc-400 mt-2">Continue where you left off, {user.firstName}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Active Courses</h2>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center min-h-75`">
            <Award className="h-12 w-12 text-zinc-500 mb-4" />
            <h3 className="text-lg font-medium text-white">No active enrollments</h3>
            <p className="text-zinc-400 mt-2 max-w-sm">You haven't enrolled in any batches yet. Browse our catalog to get started.</p>
            <button className="mt-6 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
              Explore Courses
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <Clock className="h-8 w-8 text-zinc-500 mb-3" />
              <p className="text-sm text-zinc-400">Your watch history will appear here once you start learning.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}