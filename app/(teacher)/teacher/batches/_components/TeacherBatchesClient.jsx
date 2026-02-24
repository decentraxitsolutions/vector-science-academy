'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { Layers, Users, BookOpen, Clock, CalendarDays, Globe, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TeacherBatchesClient({ batches }) {
    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">My Batches</h1>
                    <p className="text-zinc-400 mt-1">Select a batch to upload lectures, notes, and manage students.</p>
                </div>
            </div>

            {batches.length === 0 ? (
                <div className="p-12 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center bg-white/5">
                    <Layers className="h-12 w-12 text-zinc-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Batches Assigned</h3>
                    <p className="text-zinc-400 max-w-md">
                        You haven't been assigned to any active batches yet. Please contact the administrator to get your assignments.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batches.map((batch, index) => (
                        <motion.div
                            key={batch.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/teacher/batches/${batch.id}`}>
                                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group">
                                    <CardHeader className="p-6 pb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl ${batch.isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                                                <Layers className="h-6 w-6" />
                                            </div>
                                            <Badge variant={batch.isActive ? "default" : "secondary"} className={batch.isActive ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-none" : "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30 border-none"}>
                                                {batch.isActive ? "ACTIVE" : "INACTIVE"}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
                                            {batch.name}
                                        </h3>
                                        <p className="text-sm text-blue-400 line-clamp-1">{batch.course.name}</p>
                                    </CardHeader>

                                    <CardContent className="px-6 py-0 flex-1 space-y-4">
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-300 flex items-center gap-1.5">
                                                <Globe className="h-3 w-3 text-zinc-400" /> {batch.language}
                                            </Badge>
                                            {batch.timeSlot && (
                                                <Badge variant="outline" className="bg-white/5 border-white/10 text-zinc-300 flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3 text-zinc-400" /> {batch.timeSlot}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
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

                                    <CardFooter className="p-4 mt-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                                        <div className="flex gap-4 text-sm text-zinc-400">
                                            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {batch._count.enrollments} Students</span>
                                            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {batch._count.lessons} Lessons</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}