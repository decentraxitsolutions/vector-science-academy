// app/(main)/study-materials/[id]/page.jsx
'use client';

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  Download, 
  BookOpen, 
  Star, 
  Eye,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle
} from "lucide-react";

export default function MaterialDetailPage() {
  const params = useParams();
  const materialId = params.id;

  // In a real app, fetch material details based on ID
  const material = {
    title: "JEE Advanced 2024 Practice Papers",
    description: "Comprehensive practice papers for JEE Advanced preparation with detailed solutions and explanations.",
    type: "PDF",
    pages: 45,
    size: "2.5 MB",
    downloads: "15.2k",
    rating: 4.8,
    author: "Dr. Rajesh Kumar",
    lastUpdated: "March 2024",
    subject: "Mathematics",
    difficulty: "Advanced",
    free: true
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Back Button */}
        <Link href="/study-materials">
          <button className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Study Materials
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Material Header */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{material.title}</h1>
                <p className="text-zinc-400">{material.description}</p>
              </div>
              {material.free && (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  FREE
                </span>
              )}
            </div>

            {/* Material Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{material.pages}</div>
                <div className="text-xs text-zinc-500">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">{material.size}</div>
                <div className="text-xs text-zinc-500">File Size</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">{material.downloads}</div>
                <div className="text-xs text-zinc-500">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                  {material.rating} <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
                <div className="text-xs text-zinc-500">Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download Now
              </button>
              <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
            <div className="aspect-[3/4] bg-white/5 rounded-lg flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-zinc-600" />
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Discussion</h2>
            <textarea 
              placeholder="Ask a question or share your thoughts..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 mb-4"
              rows="3"
            />
            <button className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all">
              Post Comment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}