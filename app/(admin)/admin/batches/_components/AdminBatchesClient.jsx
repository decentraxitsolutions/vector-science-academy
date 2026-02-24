'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Plus, Users, BookOpen, Layers, Edit, Trash2, Power, PowerOff, Clock, CalendarDays, Globe } from "lucide-react";
import { toggleBatchStatus } from "@/actions/admin/batchActions";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CreateBatchForm from "./CreateBatchForm";

export default function AdminBatchesClient({ initialBatches, courses }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { execute: toggleStatus, isLoading: isToggling } = useFetch(toggleBatchStatus);

  const handleToggleStatus = async (batchId, currentStatus) => {
    await toggleStatus(batchId, currentStatus);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Batch Management</h1>
          <p className="text-zinc-400 mt-1">Organize student cohorts, timings, and seat capacity.</p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {initialBatches.map((batch, index) => {
          const fillPercentage = Math.min((batch._count.enrollments / batch.maxStudents) * 100, 100);
          const isFull = fillPercentage >= 100;

          return (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col overflow-hidden relative group">
                {isFull && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-lg shadow-red-500/20">
                    Batch Full
                  </div>
                )}
                
                <CardHeader className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${batch.isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                      <Layers className="h-6 w-6" />
                    </div>
                    <Badge variant={batch.isActive ? "default" : "secondary"} className={batch.isActive ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-none" : "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30 border-none"}>
                      {batch.isActive ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{batch.name}</h3>
                  <p className="text-sm text-blue-400 line-clamp-1">{batch.course.name}</p>
                </CardHeader>
                
                <CardContent className="px-6 py-0 flex-1 space-y-5">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-300 flex items-center gap-1.5">
                      <Globe className="h-3 w-3 text-zinc-400" /> {batch.language}
                    </Badge>
                    {batch.timeSlot && (
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-300 flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-zinc-400" /> {batch.timeSlot}
                      </Badge>
                    )}
                    {batch.days && (
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-300 flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3 text-zinc-400" /> {batch.days}
                      </Badge>
                    )}
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between items-end text-sm">
                      <div>
                        <span className="text-zinc-500 block text-xs mb-1">Seats Filled</span>
                        <span className="text-white font-medium">{batch._count.enrollments} <span className="text-zinc-500">/ {batch.maxStudents}</span></span>
                      </div>
                      <span className="text-zinc-400 font-medium">{Math.round(fillPercentage)}%</span>
                    </div>
                    <Progress value={fillPercentage} className={`h-2 ${isFull ? '[&>div]:bg-red-500' : '[&>div]:bg-blue-500'} bg-white/10`} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-zinc-500 text-xs block mb-1">Starts</span>
                      <span className="text-zinc-300 text-sm">{batch.startDate ? format(new Date(batch.startDate), "dd MMM yyyy") : "TBA"}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-1">Ends</span>
                      <span className="text-zinc-300 text-sm">{batch.endDate ? format(new Date(batch.endDate), "dd MMM yyyy") : "TBA"}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 mt-6 border-t border-white/10 bg-black/20 flex flex-col gap-4">
                  <div className="grid grid-cols-2 w-full gap-2 text-center text-sm text-zinc-400">
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg border border-white/5">
                      <BookOpen className="h-4 w-4 mb-1 text-zinc-500" />
                      <span className="font-medium text-white">{batch._count.lessons} <span className="text-xs text-zinc-500 font-normal">Lessons</span></span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg border border-white/5">
                      <Users className="h-4 w-4 mb-1 text-zinc-500" />
                      <span className="font-medium text-white">{batch._count.teacherBatches} <span className="text-xs text-zinc-500 font-normal">Teachers</span></span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={isToggling}
                      onClick={() => handleToggleStatus(batch.id, batch.isActive)}
                      className={batch.isActive ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/20' : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-500/20'}
                    >
                      {batch.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
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
          );
        })}
      </div>

      <CreateBatchForm 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        courses={courses}
      />
    </div>
  );
}