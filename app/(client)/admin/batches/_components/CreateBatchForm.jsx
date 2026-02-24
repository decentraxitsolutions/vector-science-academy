'use client';

import { useState } from "react";
import { Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { createBatch } from "@/actions/admin/batchActions";
import { useFetch } from "@/hooks/useFetch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function CreateBatchForm({ isOpen, onClose, courses }) {
  const [courseId, setCourseId] = useState("");
  const [language, setLanguage] = useState("Hinglish");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  const { execute: submitBatch, isLoading } = useFetch(createBatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return;
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      courseId: courseId,
      maxStudents: formData.get("maxStudents"),
      language: language,
      timeSlot: formData.get("timeSlot"),
      days: formData.get("days"),
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    await submitBatch(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-white/10 bg-white/5">
          <DialogTitle className="text-xl font-bold">Create New Batch</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Batch Name</Label>
              <Input id="name" name="name" required placeholder="e.g., Arjuna JEE 2026 Phase 1" className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Assign to Course</Label>
              <Select value={courseId} onValueChange={setCourseId} required>
                <SelectTrigger className="bg-black/50 border-white/10 focus:ring-blue-500">
                  <SelectValue placeholder="Select a parent course" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white max-h-60">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents">Seat Capacity</Label>
              <Input id="maxStudents" name="maxStudents" type="number" defaultValue="100" required className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>

            <div className="space-y-2">
              <Label>Teaching Medium (Language)</Label>
              <Select value={language} onValueChange={setLanguage} required>
                <SelectTrigger className="bg-black/50 border-white/10 focus:ring-blue-500">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Hinglish">Hinglish</SelectItem>
                  <SelectItem value="Marathi">Marathi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Input id="timeSlot" name="timeSlot" placeholder="e.g., 4:00 PM - 7:00 PM" className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Class Days</Label>
              <Input id="days" name="days" placeholder="e.g., Mon, Wed, Fri" className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-black/50 border-white/10 hover:bg-black/80 hover:text-white",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="text-white" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-black/50 border-white/10 hover:bg-black/80 hover:text-white",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="text-white" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end gap-4 sticky bottom-0 bg-zinc-950 pb-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !courseId} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Batch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}