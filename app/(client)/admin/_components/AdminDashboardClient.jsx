'use client';

import { motion } from "framer-motion";
import { Users, BookOpen, Layers, IndianRupee, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function AdminDashboardClient({ stats }) {
  const statCards = [
    { title: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
    { title: "Active Courses", value: stats.activeCourses, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/20" },
    { title: "Active Batches", value: stats.totalBatches, icon: Layers, color: "text-amber-400", bg: "bg-amber-500/20" },
    { title: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-zinc-400 mt-1">Real-time metrics for Vector Science Academy.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors w-fit">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          Generate Report
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-400">{card.title}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Recent Enrollments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-white/5 text-xs uppercase text-zinc-300">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Batch</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {stats.recentEnrollments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">
                    No recent enrollments found.
                  </td>
                </tr>
              ) : (
                stats.recentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {enrollment.user.imageUrl ? (
                        <Image src={enrollment.user.imageUrl} alt="" width={32} height={32} className="rounded-full bg-zinc-800" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                          {enrollment.user.firstName?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{enrollment.user.firstName} {enrollment.user.lastName}</p>
                        <p className="text-xs">{enrollment.user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{enrollment.batch.course.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                        {enrollment.batch.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}