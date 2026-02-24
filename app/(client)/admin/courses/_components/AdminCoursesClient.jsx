'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye, EyeOff, MonitorPlay } from "lucide-react";
import { toggleCoursePublish } from "@/actions/admin/courseActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreateCourseForm from "./CreateCourseForm";

export default function AdminCoursesClient({ courses }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleTogglePublish = async (courseId, currentStatus) => {
    await toggleCoursePublish(courseId, currentStatus);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Course Management</h1>
          <p className="text-zinc-400 mt-1">Manage hybrid courses, individual modules, and free content.</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col overflow-hidden">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${course.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                    <MonitorPlay className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="border-white/10 text-zinc-300 bg-black/40">
                      {course.category}
                    </Badge>
                    <Badge variant="secondary" className={course.isFree ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none" : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-none"}>
                      {course.isFree ? "FREE" : `₹${course.fee}`}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{course.name}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2">{course.description}</p>
              </CardHeader>
              
              <CardContent className="px-6 py-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 mt-2">
                  <Badge variant="outline" className="border-white/5 text-zinc-400 bg-transparent">
                    {course.isStandalone ? "Individual Course" : "Batch Based"}
                  </Badge>
                  <Badge variant="outline" className="border-white/5 text-zinc-400 bg-transparent">
                    Valid till {course.expiryDate ? format(new Date(course.expiryDate), "MMM yyyy") : "N/A"}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-4 mt-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                <div className="flex gap-4 text-sm text-zinc-400">
                  {!course.isStandalone && <span>{course._count.batches} Batches</span>}
                  <span>{course._count.payments} Sales</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleTogglePublish(course.id, course.isPublished)}
                    className={course.isPublished ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20' : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-500/20'}
                  >
                    {course.isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <CreateCourseForm 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}