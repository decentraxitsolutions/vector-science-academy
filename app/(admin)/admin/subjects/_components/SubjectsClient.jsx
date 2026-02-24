'use client';

import { useState } from "react";
import { Library, Plus, Trash2, Loader2 } from "lucide-react";
import { createSubject, deleteSubject } from "@/actions/admin/subjectActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SubjectsClient({ initialSubjects }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddSubject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        await createSubject(formData);
        e.target.reset(); // Clear the input
        setIsSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this subject?")) {
            await deleteSubject(id);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Manage Subjects</h1>
                <p className="text-zinc-400 mt-1">Add subjects (e.g., Physics, Mathematics) that teachers can tag their lectures with.</p>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                    <form onSubmit={handleAddSubject} className="flex items-end gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-300">New Subject Name</label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Chemistry"
                                required
                                className="bg-black/40 border-white/10 text-white focus-visible:ring-blue-500"
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white w-32">
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4 mr-2" /> Add</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialSubjects.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-zinc-500 border border-dashed border-white/10 rounded-xl bg-white/5">
                        No subjects added yet.
                    </div>
                ) : (
                    initialSubjects.map((subject) => (
                        <div key={subject.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/40 group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Library className="h-4 w-4 text-blue-400" />
                                </div>
                                <span className="font-medium text-white">{subject.name}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(subject.id)}
                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}