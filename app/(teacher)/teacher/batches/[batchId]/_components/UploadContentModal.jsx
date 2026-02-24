// 'use client';

// import { useState, useRef } from "react";
// import { Loader2, Video, FileText, ShieldCheck, Lock, UploadCloud, X, Check, FileCheck } from "lucide-react";
// import { createLesson, createStudyMaterial, createSubjectQuick } from "@/actions/teacher/contentActions";
// import { getVdoCipherUploadCredentials } from "@/actions/teacher/vdoCipherActions";
// import { useFetch } from "@/hooks/useFetch";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";

// // UploadThing Import
// import { UploadDropzone } from "@/utils/uploadthing";

// export default function UploadContentSheet({ isOpen, onClose, batchId, subjects: initialSubjects }) {
//     const [activeTab, setActiveTab] = useState("video");
//     const [subjectId, setSubjectId] = useState("");
//     const [isFreePreview, setIsFreePreview] = useState(false);

//     // Video States
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);

//     // PDF States
//     const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
//     const [pdfFileName, setPdfFileName] = useState("");

//     // Dynamic Subjects State
//     const [localSubjects, setLocalSubjects] = useState(initialSubjects || []);
//     const [isCreatingSubject, setIsCreatingSubject] = useState(false);
//     const [newSubjectName, setNewSubjectName] = useState("");
//     const [isSavingSubject, setIsSavingSubject] = useState(false);

//     const fileInputRef = useRef(null);
//     const { execute: submitLesson, isLoading: isSavingVideo } = useFetch(createLesson);
//     const { execute: submitMaterial, isLoading: isSavingPdf } = useFetch(createStudyMaterial);

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setSelectedFile(e.target.files[0]);
//         }
//     };

//     const handleCreateSubject = async () => {
//         if (!newSubjectName.trim()) return;
//         setIsSavingSubject(true);
//         try {
//             const newSub = await createSubjectQuick(newSubjectName);

//             const alreadyExists = localSubjects.find(s => s.id === newSub.id);
//             if (!alreadyExists) {
//                 setLocalSubjects(prev => [...prev, newSub].sort((a, b) => a.name.localeCompare(b.name)));
//             }

//             setSubjectId(newSub.id);
//             setIsCreatingSubject(false);
//             setNewSubjectName("");
//         } catch (error) {
//             console.error("Failed to create subject", error);
//         } finally {
//             setIsSavingSubject(false);
//         }
//     };

//     const uploadToVdoCipher = async (file, title) => {
//         const { clientPayload, videoId } = await getVdoCipherUploadCredentials(title);

//         const formData = new FormData();
//         formData.append("policy", clientPayload.policy);
//         formData.append("key", clientPayload.key);
//         formData.append("x-amz-signature", clientPayload['x-amz-signature']);
//         formData.append("x-amz-algorithm", clientPayload['x-amz-algorithm']);
//         formData.append("x-amz-date", clientPayload['x-amz-date']);
//         formData.append("x-amz-credential", clientPayload['x-amz-credential']);
//         formData.append("success_action_status", "201");
//         formData.append("success_action_redirect", "");
//         formData.append("file", file);

//         return new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest();

//             xhr.upload.onprogress = (event) => {
//                 if (event.lengthComputable) {
//                     const percentComplete = Math.round((event.loaded / event.total) * 100);
//                     setUploadProgress(percentComplete);
//                 }
//             };

//             xhr.onload = () => {
//                 if (xhr.status >= 200 && xhr.status < 300) {
//                     resolve(videoId);
//                 } else {
//                     reject("Upload failed");
//                 }
//             };

//             xhr.onerror = () => reject("Network Error during upload");

//             xhr.open("POST", clientPayload.uploadLink, true);
//             xhr.send(formData);
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!subjectId) return;

//         const formData = new FormData(e.target);
//         const title = formData.get("title");
//         const description = formData.get("description");

//         if (activeTab === "video") {
//             if (!selectedFile) return alert("Please select a video file first.");

//             try {
//                 setIsUploading(true);
//                 const finalVideoId = await uploadToVdoCipher(selectedFile, title);

//                 await submitLesson({
//                     title,
//                     description,
//                     playbackId: finalVideoId,
//                     isFreePreview,
//                     subjectId,
//                     batchId
//                 });

//                 resetAndClose();
//             } catch (error) {
//                 console.error("Upload failed", error);
//                 alert("Video upload failed. Please try again.");
//             } finally {
//                 setIsUploading(false);
//             }
//         } else {
//             // PDF logic
//             if (!uploadedPdfUrl) return alert("Please upload a PDF file first.");

//             await submitMaterial({
//                 title,
//                 description,
//                 fileUrl: uploadedPdfUrl, // Coming directly from UploadThing
//                 pages: formData.get("pages") || "0",
//                 size: formData.get("size") || "Unknown",
//                 isFreePreview,
//                 subjectId,
//                 batchId
//             });
//             resetAndClose();
//         }
//     };

//     const resetAndClose = () => {
//         setSelectedFile(null);
//         setUploadProgress(0);
//         setIsUploading(false);
//         setIsCreatingSubject(false);
//         setNewSubjectName("");
//         setUploadedPdfUrl("");
//         setPdfFileName("");
//         onClose();
//     };

//     return (
//         <Sheet open={isOpen} onOpenChange={resetAndClose}>
//             <SheetContent className="bg-zinc-950 border-l border-white/10 text-white sm:max-w-xl w-[90vw] p-0 flex flex-col">
//                 <SheetHeader className="p-6 border-b border-white/10 bg-white/5">
//                     <div className="flex items-center gap-2 mb-1">
//                         <ShieldCheck className="h-5 w-5 text-emerald-500" />
//                         <SheetTitle className="text-xl font-bold text-white">Secure Content Upload</SheetTitle>
//                     </div>
//                     <SheetDescription className="text-zinc-400">
//                         Upload DRM protected videos or PDF study materials.
//                     </SheetDescription>
//                 </SheetHeader>

//                 <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-8">
//                     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                         <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10 rounded-xl p-1 mb-8">
//                             <TabsTrigger value="video" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-zinc-400 transition-all">
//                                 <Video className="h-4 w-4 mr-2" /> Video Lecture
//                             </TabsTrigger>
//                             <TabsTrigger value="pdf" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 transition-all">
//                                 <FileText className="h-4 w-4 mr-2" /> PDF Notes
//                             </TabsTrigger>
//                         </TabsList>

//                         <div className="space-y-6">
//                             {/* Common Fields */}
//                             <div className="space-y-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="title" className="text-zinc-300">Content Title</Label>
//                                     <Input id="title" name="title" required placeholder="e.g., Chapter 1: Advanced Mechanics" className="bg-black/40 border-white/10 focus-visible:ring-emerald-500 h-11" disabled={isUploading || isSavingPdf} />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <div className="flex items-center justify-between">
//                                         <Label className="text-zinc-300">Subject</Label>
//                                         {!isCreatingSubject && (
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setIsCreatingSubject(true)}
//                                                 className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
//                                             >
//                                                 + Add New Subject
//                                             </button>
//                                         )}
//                                     </div>

//                                     {isCreatingSubject ? (
//                                         <div className="flex items-center gap-2">
//                                             <Input
//                                                 autoFocus
//                                                 placeholder="Type new subject name..."
//                                                 value={newSubjectName}
//                                                 onChange={(e) => setNewSubjectName(e.target.value)}
//                                                 className="bg-black/40 border-emerald-500/30 focus-visible:ring-emerald-500 h-11"
//                                                 disabled={isSavingSubject}
//                                                 onKeyDown={(e) => {
//                                                     if (e.key === 'Enter') {
//                                                         e.preventDefault();
//                                                         handleCreateSubject();
//                                                     }
//                                                 }}
//                                             />
//                                             <Button
//                                                 type="button"
//                                                 onClick={handleCreateSubject}
//                                                 disabled={isSavingSubject || !newSubjectName.trim()}
//                                                 className="bg-emerald-600 hover:bg-emerald-700 h-11 px-3"
//                                             >
//                                                 {isSavingSubject ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
//                                             </Button>
//                                             <Button
//                                                 type="button"
//                                                 variant="ghost"
//                                                 onClick={() => {
//                                                     setIsCreatingSubject(false);
//                                                     setNewSubjectName("");
//                                                 }}
//                                                 className="h-11 px-3 text-zinc-400 hover:text-white"
//                                             >
//                                                 <X className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     ) : (
//                                         <Select value={subjectId} onValueChange={setSubjectId} required disabled={isUploading || isSavingPdf}>
//                                             <SelectTrigger className="bg-black/40 border-white/10 focus:ring-emerald-500 h-11">
//                                                 <SelectValue placeholder="Select the subject" />
//                                             </SelectTrigger>
//                                             <SelectContent className="bg-zinc-900 border-white/10 text-white max-h-60">
//                                                 {localSubjects && localSubjects.length > 0 ? (
//                                                     localSubjects.map((sub) => (
//                                                         <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
//                                                     ))
//                                                 ) : (
//                                                     <div className="p-3 text-sm text-zinc-500 text-center italic">
//                                                         No subjects found. Click "+ Add New Subject" above.
//                                                     </div>
//                                                 )}
//                                             </SelectContent>
//                                         </Select>
//                                     )}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="description" className="text-zinc-300">Description (Optional)</Label>
//                                     <Textarea id="description" name="description" rows={3} placeholder="Brief summary of what this covers..." className="bg-black/40 border-white/10 focus-visible:ring-emerald-500 resize-none" disabled={isUploading || isSavingPdf} />
//                                 </div>
//                             </div>

//                             <Separator className="bg-white/10" />

//                             {/* Secure Video Fields */}
//                             {activeTab === "video" && (
//                                 <div className="space-y-6">
//                                     <div className="border border-emerald-500/20 rounded-xl p-6 bg-emerald-500/5 relative overflow-hidden group">
//                                         <div className="absolute top-0 right-0 p-3 opacity-20">
//                                             <Lock className="h-24 w-24 text-emerald-500" />
//                                         </div>
//                                         <div className="relative z-10">
//                                             <div className="flex items-center gap-2 mb-4">
//                                                 <ShieldCheck className="h-5 w-5 text-emerald-500" />
//                                                 <h4 className="font-semibold text-emerald-400">DRM Protected Upload</h4>
//                                             </div>

//                                             <input
//                                                 type="file"
//                                                 accept="video/mp4,video/webm,video/mkv"
//                                                 className="hidden"
//                                                 ref={fileInputRef}
//                                                 onChange={handleFileChange}
//                                                 disabled={isUploading}
//                                             />

//                                             {!selectedFile ? (
//                                                 <div
//                                                     onClick={() => fileInputRef.current?.click()}
//                                                     className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-500 transition-colors rounded-xl p-8 bg-black/40 text-center cursor-pointer"
//                                                 >
//                                                     <div className="p-4 bg-emerald-500/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
//                                                         <UploadCloud className="h-8 w-8 text-emerald-500" />
//                                                     </div>
//                                                     <p className="text-sm font-semibold text-white mb-1">Click to select video file</p>
//                                                     <p className="text-xs text-zinc-500">MP4, WebM or MKV</p>
//                                                 </div>
//                                             ) : (
//                                                 <div className="p-4 bg-black/60 border border-emerald-500/30 rounded-xl flex items-center justify-between">
//                                                     <div className="flex items-center gap-3 overflow-hidden">
//                                                         <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
//                                                             <Video className="h-5 w-5 text-emerald-400" />
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
//                                                             <p className="text-xs text-zinc-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
//                                                         </div>
//                                                     </div>
//                                                     {!isUploading && (
//                                                         <Button type="button" variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="text-zinc-400 hover:text-red-400">
//                                                             <X className="h-4 w-4" />
//                                                         </Button>
//                                                     )}
//                                                 </div>
//                                             )}

//                                             {isUploading && (
//                                                 <div className="mt-4 space-y-2">
//                                                     <div className="flex justify-between text-xs font-medium">
//                                                         <span className="text-emerald-400">Encrypting & Uploading...</span>
//                                                         <span className="text-white">{uploadProgress}%</span>
//                                                     </div>
//                                                     <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/5">
//                                                         <div className="bg-emerald-500 h-2 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Secure PDF Fields (UploadThing) */}
//                             {activeTab === "pdf" && (
//                                 <div className="space-y-6">
//                                     <div className="border border-blue-500/20 rounded-xl p-6 bg-blue-500/5 relative overflow-hidden group">
//                                         <div className="absolute top-0 right-0 p-3 opacity-20">
//                                             <FileText className="h-24 w-24 text-blue-500" />
//                                         </div>
//                                         <div className="relative z-10">
//                                             <div className="flex items-center gap-2 mb-4">
//                                                 <FileText className="h-5 w-5 text-blue-500" />
//                                                 <h4 className="font-semibold text-blue-400">PDF Document Upload</h4>
//                                             </div>

//                                             {!uploadedPdfUrl ? (
//                                                 <div className="bg-black/40 p-4 rounded-xl border border-white/10">
//                                                     <UploadDropzone
//                                                         endpoint="pdfUploader"
//                                                         onClientUploadComplete={(res) => {
//                                                             setUploadedPdfUrl(res[0].url);
//                                                             setPdfFileName(res[0].name);
//                                                         }}
//                                                         onUploadError={(error) => {
//                                                             alert(`ERROR! ${error.message}`);
//                                                         }}
//                                                         className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-label:text-blue-400 ut-allowed-content:text-zinc-400 border-dashed border-blue-500/30"
//                                                     />
//                                                 </div>
//                                             ) : (
//                                                 <div className="p-4 bg-black/60 border border-blue-500/30 rounded-xl flex items-center justify-between mb-4">
//                                                     <div className="flex items-center gap-3 overflow-hidden">
//                                                         <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
//                                                             <FileCheck className="h-5 w-5 text-blue-400" />
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <p className="text-sm font-medium text-white truncate">{pdfFileName}</p>
//                                                             <p className="text-xs text-emerald-400">Upload Complete</p>
//                                                         </div>
//                                                     </div>
//                                                     <Button type="button" variant="ghost" size="icon" onClick={() => { setUploadedPdfUrl(""); setPdfFileName(""); }} className="text-zinc-400 hover:text-red-400">
//                                                         <X className="h-4 w-4" />
//                                                     </Button>
//                                                 </div>
//                                             )}

//                                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor="pages" className="text-xs text-zinc-300">Total Pages</Label>
//                                                     <Input id="pages" name="pages" type="number" placeholder="e.g., 24" className="bg-black/60 border-blue-500/30 focus-visible:ring-blue-500" disabled={isSavingPdf} />
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor="size" className="text-xs text-zinc-300">File Size Info</Label>
//                                                     <Input id="size" name="size" placeholder="e.g., 4.2 MB" className="bg-black/60 border-blue-500/30 focus-visible:ring-blue-500" disabled={isSavingPdf} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             <Separator className="bg-white/10" />

//                             <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
//                                 <div className="space-y-0.5">
//                                     <Label className="text-sm font-semibold text-white">Set as Free Demo</Label>
//                                     <p className="text-xs text-zinc-400">Allow unregistered users to view this to drive conversions.</p>
//                                 </div>
//                                 <Switch checked={isFreePreview} onCheckedChange={setIsFreePreview} className="data-[state=checked]:bg-emerald-500" disabled={isUploading || isSavingPdf} />
//                             </div>
//                         </div>
//                     </Tabs>

//                     <div className="pt-6 border-t border-white/10 flex justify-end gap-4 sticky bottom-0 bg-zinc-950 pb-2">
//                         <Button type="button" variant="outline" onClick={resetAndClose} disabled={isUploading || isSavingPdf} className="border-white/10 hover:bg-white/5 hover:text-white">
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             disabled={isUploading || isSavingPdf || !subjectId || (activeTab === "video" && !selectedFile) || (activeTab === "pdf" && !uploadedPdfUrl)}
//                             className={activeTab === 'video' ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
//                         >
//                             {isUploading || isSavingPdf ? (
//                                 <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</>
//                             ) : (
//                                 "Securely Publish"
//                             )}
//                         </Button>
//                     </div>
//                 </form>
//             </SheetContent>
//         </Sheet>
//     );
// }

'use client';

import { useState, useRef } from "react";
import { Loader2, Video, FileText, ShieldCheck, Lock, UploadCloud, X, Check, FileCheck } from "lucide-react";
import { createLesson, createStudyMaterial, createSubjectQuick } from "@/actions/teacher/contentActions";
import { getVdoCipherUploadCredentials } from "@/actions/teacher/vdoCipherActions";
import { useFetch } from "@/hooks/useFetch";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UploadDropzone } from "@uploadthing/react";

export default function UploadContentSheet({ isOpen, onClose, batchId, subjects: initialSubjects }) {
    const [activeTab, setActiveTab] = useState("video");
    const [subjectId, setSubjectId] = useState("");
    const [isFreePreview, setIsFreePreview] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
    const [pdfFileName, setPdfFileName] = useState("");

    const [localSubjects, setLocalSubjects] = useState(initialSubjects || []);
    const [isCreatingSubject, setIsCreatingSubject] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [isSavingSubject, setIsSavingSubject] = useState(false);

    const fileInputRef = useRef(null);
    const { execute: submitLesson, isLoading: isSavingVideo } = useFetch(createLesson);
    const { execute: submitMaterial, isLoading: isSavingPdf } = useFetch(createStudyMaterial);

    const handleCreateSubject = async () => {
        if (!newSubjectName.trim()) return;
        setIsSavingSubject(true);
        try {
            const newSub = await createSubjectQuick(newSubjectName);
            if (!localSubjects.find(s => s.id === newSub.id)) {
                setLocalSubjects(prev => [...prev, newSub].sort((a, b) => a.name.localeCompare(b.name)));
            }
            setSubjectId(newSub.id);
            setIsCreatingSubject(false);
            setNewSubjectName("");
        } finally {
            setIsSavingSubject(false);
        }
    };

    const uploadToVdoCipher = async (file, title) => {
        const { clientPayload, videoId } = await getVdoCipherUploadCredentials(title);
        const formData = new FormData();
        Object.entries(clientPayload).forEach(([k, v]) => formData.append(k, v));
        formData.append("file", file);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (e) => setUploadProgress(Math.round((e.loaded / e.total) * 100));
            xhr.onload = () => xhr.status < 300 ? resolve(videoId) : reject("Upload Failed");
            xhr.onerror = () => reject("Network Error");
            xhr.open("POST", clientPayload.uploadLink, true);
            xhr.send(formData);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (activeTab === "video") {
            setIsUploading(true);
            const vId = await uploadToVdoCipher(selectedFile, formData.get("title"));
            await submitLesson({ title: formData.get("title"), description: formData.get("description"), playbackId: vId, isFreePreview, subjectId, batchId });
            resetAndClose();
        } else {
            await submitMaterial({ title: formData.get("title"), description: formData.get("description"), fileUrl: uploadedPdfUrl, pages: formData.get("pages"), size: formData.get("size"), isFreePreview, subjectId, batchId });
            resetAndClose();
        }
    };

    const resetAndClose = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setIsUploading(false);
        setUploadedPdfUrl("");
        onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={resetAndClose}>
            <SheetContent className="bg-zinc-950 border-l border-white/10 text-white sm:max-w-xl w-[90vw] p-0 flex flex-col overflow-y-auto">
                <SheetHeader className="p-6 border-b border-white/10">
                    <SheetTitle>Upload Content</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-2 mb-6">
                            <TabsTrigger value="video">Video</TabsTrigger>
                            <TabsTrigger value="pdf">PDF</TabsTrigger>
                        </TabsList>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" required className="bg-white/5 border-white/10" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Subject</Label>
                                    <button type="button" onClick={() => setIsCreatingSubject(true)} className="text-xs text-emerald-400">+ New</button>
                                </div>
                                {isCreatingSubject ? (
                                    <div className="flex gap-2">
                                        <Input value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} className="bg-white/5" />
                                        <Button type="button" onClick={handleCreateSubject} className="bg-emerald-600"><Check className="h-4 w-4" /></Button>
                                    </div>
                                ) : (
                                    <Select value={subjectId} onValueChange={setSubjectId} required>
                                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                                        <SelectContent className="bg-zinc-900 text-white">
                                            {localSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>

                        <Separator className="my-6 bg-white/10" />

                        {activeTab === "video" ? (
                            <div className="border-2 border-dashed border-white/10 p-8 rounded-xl text-center cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                <input type="file" ref={fileInputRef} hidden onChange={e => setSelectedFile(e.target.files[0])} />
                                <UploadCloud className="mx-auto h-12 w-12 text-zinc-500 mb-2" />
                                <p>{selectedFile ? selectedFile.name : "Select Video File"}</p>
                                {isUploading && <div className="w-full bg-white/10 h-2 mt-4 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full" style={{ width: `${uploadProgress}%` }} /></div>}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {!uploadedPdfUrl ? (
                                    <UploadDropzone endpoint="pdfUploader" onClientUploadComplete={res => { setUploadedPdfUrl(res[0].url); setPdfFileName(res[0].name); }} className="border-white/10" />
                                ) : (
                                    <div className="p-4 bg-white/5 rounded-xl flex justify-between items-center">
                                        <div className="flex items-center gap-2"><FileCheck className="text-emerald-500" /> {pdfFileName}</div>
                                        <X className="cursor-pointer" onClick={() => setUploadedPdfUrl("")} />
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="pages" placeholder="Pages" className="bg-white/5 border-white/10" />
                                    <Input name="size" placeholder="Size (MB)" className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                        )}
                    </Tabs>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <Label>Free Preview</Label>
                        <Switch checked={isFreePreview} onCheckedChange={setIsFreePreview} />
                    </div>

                    <Button type="submit" disabled={isUploading || isSavingPdf} className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {isUploading || isSavingPdf ? <Loader2 className="animate-spin" /> : "Publish Content"}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}