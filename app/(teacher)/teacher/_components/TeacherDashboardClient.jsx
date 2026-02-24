'use client';

import { motion } from "framer-motion";
import { Video, Users, FileText, Layers } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function TeacherDashboardClient({ stats }) {
  const quickActions = [
    {
      title: "My Batches",
      description: "Manage your assigned cohorts",
      icon: Layers,
      href: "/teacher/batches",
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      hover: "hover:bg-amber-500/10 hover:border-amber-500/30"
    },
    {
      title: "Upload Lecture",
      description: "Direct upload to Mux",
      icon: Video,
      href: "/teacher/lectures",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      hover: "hover:bg-blue-500/10 hover:border-blue-500/30"
    },
    {
      title: "Study Materials",
      description: "Upload PDFs and notes",
      icon: FileText,
      href: "/teacher/materials",
      color: "text-rose-400",
      bg: "bg-rose-500/20",
      hover: "hover:bg-rose-500/10 hover:border-rose-500/30"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Teacher Workspace</h1>
        <p className="text-zinc-400 mt-2">Welcome back, {stats.firstName}. Manage your classes and students.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-zinc-400">Active Batches</p>
            <h3 className="text-3xl font-bold text-white mt-2">{stats.activeBatchesCount}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-zinc-400">Total Students</p>
            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalStudents}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-zinc-400">Lectures Uploaded</p>
            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalLessons}</h3>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-zinc-400">Study Materials</p>
            <h3 className="text-3xl font-bold text-white mt-2">{stats.totalMaterials}</h3>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold text-white pt-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={action.href}>
              <Card className={`bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 ${action.hover} h-full`}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className={`p-4 rounded-full ${action.bg} ${action.color}`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{action.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}