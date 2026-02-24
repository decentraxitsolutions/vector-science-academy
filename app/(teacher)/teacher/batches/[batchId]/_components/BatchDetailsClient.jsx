'use client';

import { useState } from "react";
import { format } from "date-fns";
import { Video, FileText, Plus, Search, ChevronLeft, LockOpen, Lock, Users, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import UploadContentSheet from "./UploadContentModal";

export default function BatchDetailsClient({ batch, subjects }) {
  const [isUploadSheetOpen, setIsUploadSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = batch.lessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredMaterials = batch.materials.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // 100% Real Dynamic Data from the database
  const totalStudents = batch._count?.enrollments || 0;
  const totalVideos = batch.lessons.length;
  // These will be calculated dynamically later when we build the student tracking engine
  const avgWatchTime = "0m"; 
  const engagementScore = "0%"; 

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/teacher/batches" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to My Batches
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">{batch.name}</h1>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 mt-1">
              Active Workspace
            </Badge>
          </div>
          {/* Changed from <p> to <div> to permanently fix the hydration and HTML nesting error */}
          <div className="text-zinc-400 mt-1 flex items-center gap-2 text-sm">
            {batch.course.name} <Separator orientation="vertical" className="h-4 bg-white/20" /> {batch.language}
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Search content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-black/40 border-white/10 text-white focus-visible:ring-amber-500"
            />
          </div>
          <Button 
            onClick={() => setIsUploadSheetOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Analytical Overview Cards (Real Data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Students</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold text-white">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium text-zinc-400">Lectures Published</CardTitle>
            <Video className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold text-white">{totalVideos}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium text-zinc-400">Avg. Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold text-white">{avgWatchTime} <span className="text-sm text-zinc-500 font-normal">/ lecture</span></div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium text-zinc-400">Engagement Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold text-emerald-400">{engagementScore}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="lectures" className="w-full">
        <TabsList className="bg-black/40 border border-white/10 p-1 rounded-xl h-auto">
          <TabsTrigger value="lectures" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white/10 data-[state=active]:text-amber-400 text-zinc-400 transition-all">
            <Video className="h-4 w-4 mr-2" />
            Video Lectures
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white/10 data-[state=active]:text-amber-400 text-zinc-400 transition-all">
            <FileText className="h-4 w-4 mr-2" />
            PDF & Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lectures" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLessons.length === 0 ? (
              <div className="col-span-full p-12 text-center text-zinc-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                No video lectures published yet. Click "Add Content" to begin.
              </div>
            ) : (
              filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-all">
                  <div className="aspect-video bg-black/60 relative flex flex-col items-center justify-center border-b border-white/10">
                    <Video className="h-8 w-8 text-zinc-600 mb-2 group-hover:text-amber-400 transition-all" />
                    {lesson.isFreePreview && (
                      <Badge className="absolute top-3 right-3 bg-green-500/20 text-green-400 hover:bg-green-500/30 border-none font-medium px-2 py-0.5 text-[10px] uppercase tracking-wider">
                        <LockOpen className="h-3 w-3 mr-1" /> Demo
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-white/10 text-zinc-300 bg-transparent text-[10px] px-2 py-0">
                        {lesson.subject?.name || "Uncategorized"}
                      </Badge>
                      <span className="text-[10px] text-zinc-500">{format(new Date(lesson.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 leading-snug">{lesson.title}</h3>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMaterials.length === 0 ? (
              <div className="col-span-full p-12 text-center text-zinc-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                No study materials published yet. Click "Add Content" to begin.
              </div>
            ) : (
              filteredMaterials.map((material) => (
                <Card key={material.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <FileText className="h-8 w-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5 text-[10px] px-2 py-0">
                          {material.subject?.name || "Uncategorized"}
                        </Badge>
                        {material.isFreePreview ? <LockOpen className="h-3 w-3 text-green-400" /> : <Lock className="h-3 w-3 text-zinc-500" />}
                      </div>
                      <h3 className="font-bold text-white text-sm truncate mt-1">{material.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-400">
                        <span>{material.pages} Pages</span>
                        <span>•</span>
                        <span>{material.size || "Unknown size"}</span>
                        <span>•</span>
                        <span>{format(new Date(material.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <UploadContentSheet 
        isOpen={isUploadSheetOpen} 
        onClose={() => setIsUploadSheetOpen(false)} 
        batchId={batch.id}
        subjects={subjects}
      />
    </div>
  );
}