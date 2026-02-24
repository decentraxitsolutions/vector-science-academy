'use client';

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { assignTeacherToBatch } from "@/actions/admin/userActions";
import { useFetch } from "@/hooks/useFetch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AssignBatchModal({ teacher, activeBatches, isOpen, onClose }) {
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const { execute: assignBatch, isLoading } = useFetch(assignTeacherToBatch);

  // Filter out batches the teacher is already assigned to
  const assignedBatchIds = teacher.teacherBatches.map(tb => tb.batch.id);
  const availableBatches = activeBatches.filter(b => !assignedBatchIds.includes(b.id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBatchId) return;
    await assignBatch(teacher.id, selectedBatchId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Assign to Batch</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-1">
            <p className="text-sm text-zinc-400">Assigning batches to:</p>
            <p className="font-medium text-white">{teacher.firstName} {teacher.lastName}</p>
          </div>

          <div className="space-y-2">
            <Label>Select Active Batch</Label>
            <Select value={selectedBatchId} onValueChange={setSelectedBatchId} required>
              <SelectTrigger className="bg-black/50 border-white/10 focus:ring-blue-500">
                <SelectValue placeholder="Choose a batch..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 text-white max-h-60">
                {availableBatches.length === 0 ? (
                  <div className="p-2 text-sm text-zinc-500 text-center">No available batches to assign.</div>
                ) : (
                  availableBatches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      <span className="font-medium">{batch.name}</span>
                      <span className="text-zinc-500 ml-2 text-xs">({batch.course.name})</span>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !selectedBatchId || availableBatches.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Assignment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}