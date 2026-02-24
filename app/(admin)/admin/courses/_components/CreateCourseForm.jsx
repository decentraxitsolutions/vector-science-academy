'use client';

import { useState } from "react";
import { Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { createCourse } from "@/actions/admin/courseActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function CreateCourseForm({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [category, setCategory] = useState("Competitive Exams");
  const [expiryDate, setExpiryDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStandalone && !expiryDate) return; 
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      category: category,
      expiryDate: expiryDate ? expiryDate.toISOString() : null,
      fee: formData.get("fee"),
      description: formData.get("description"),
      fullDescription: formData.get("fullDescription"),
      curriculum: formData.get("curriculum"),
      features: formData.get("features"),
      schedule: formData.get("schedule"),
      eligibility: formData.get("eligibility"),
      isFree,
      isStandalone
    };

    await createCourse(data);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-white/10 bg-white/5">
          <DialogTitle className="text-xl font-bold">Create New Course</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-1 space-y-8">
          
          <div className="flex flex-col md:flex-row gap-8 p-4 bg-blue-950/20 border border-blue-900/50 rounded-xl">
            <div className="flex items-center justify-between w-full">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-white">Free Course</Label>
                <p className="text-xs text-zinc-400">Available to all registered users without payment.</p>
              </div>
              <Switch checked={isFree} onCheckedChange={setIsFree} className="data-[state=checked]:bg-blue-600" />
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold text-white">Individual Course</Label>
                <p className="text-xs text-zinc-400">Standalone course without batch assignments.</p>
              </div>
              <Switch checked={isStandalone} onCheckedChange={setIsStandalone} className="data-[state=checked]:bg-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Course Name</Label>
              <Input id="name" name="name" required className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-black/50 border-white/10 focus:ring-blue-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="Competitive Exams">Competitive Exams</SelectItem>
                  <SelectItem value="Higher Secondary">Higher Secondary</SelectItem>
                  <SelectItem value="Secondary Education">Secondary Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <Label htmlFor="fee">Total Fee (₹)</Label>
              <Input id="fee" name="fee" type="number" required={!isFree} disabled={isFree} placeholder={isFree ? "Free Course" : "0"} className="bg-black/50 border-white/10 focus-visible:ring-blue-500 disabled:opacity-50" />
            </div>

            {isStandalone && (
              <div className="space-y-2 flex flex-col justify-end md:col-span-2">
                <Label>Course Validity (Expiry Date)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-black/50 border-white/10 hover:bg-black/80 hover:text-white",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : <span>Pick an expiry date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Short Description</Label>
              <Input id="description" name="description" required className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullDescription">Full Detailed Description</Label>
              <Textarea id="fullDescription" name="fullDescription" required rows={4} className="bg-black/50 border-white/10 focus-visible:ring-blue-500 resize-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="curriculum">Curriculum (One item per line)</Label>
              <Textarea id="curriculum" name="curriculum" required rows={4} placeholder="Physics: Mechanics...&#10;Chemistry: Organic..." className="bg-black/50 border-white/10 focus-visible:ring-blue-500 resize-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="features">Features (One item per line)</Label>
              <Textarea id="features" name="features" required rows={4} placeholder="Live Classes&#10;Recorded VODs&#10;PDF Notes..." className="bg-black/50 border-white/10 focus-visible:ring-blue-500 resize-none" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule Details</Label>
              <Input id="schedule" name="schedule" required placeholder="e.g., Weekend batches, Self-paced" className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Input id="eligibility" name="eligibility" required placeholder="e.g., Passed 10th" className="bg-black/50 border-white/10 focus-visible:ring-blue-500" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end gap-4 sticky bottom-0 bg-zinc-950 pb-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || (isStandalone && !expiryDate)} className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}