// app/(main)/study-materials/page.jsx
'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Search,
  Filter,
  ChevronRight,
  Star,
  Clock,
  Eye,
  Award,
  Brain,
  Calculator,
  FlaskConical,
  Atom,
  BookMarked,
  GraduationCap,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// Study materials data
const studyMaterials = {
  popular: [
    {
      id: 1,
      title: "JEE Advanced 2024 Practice Papers",
      subject: "Mathematics",
      type: "PDF",
      size: "2.5 MB",
      pages: 45,
      downloads: "15.2k",
      rating: 4.8,
      difficulty: "Advanced",
      free: true,
      icon: Calculator,
      color: "from-purple-500 to-pink-500",
      description: "Full-length practice papers with detailed solutions"
    },
    {
      id: 2,
      title: "NEET Biology Complete Notes",
      subject: "Biology",
      type: "PDF",
      size: "8.1 MB",
      pages: 120,
      downloads: "12.8k",
      rating: 4.9,
      difficulty: "Expert",
      free: true,
      icon: FlaskConical,
      color: "from-green-500 to-emerald-500",
      description: "Comprehensive biology notes for NEET aspirants"
    },
    {
      id: 3,
      title: "MHT-CET Formula Handbook",
      subject: "All Subjects",
      type: "PDF",
      size: "3.2 MB",
      pages: 85,
      downloads: "10.5k",
      rating: 4.7,
      difficulty: "Intermediate",
      free: true,
      icon: BookMarked,
      color: "from-blue-500 to-cyan-500",
      description: "Quick revision formulas for Physics, Chemistry, Maths"
    }
  ],
  categories: [
    {
      name: "JEE Materials",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      materials: [
        { title: "JEE Main 2024 Chapter-wise Tests", type: "PDF", pages: 65, free: true },
        { title: "Advanced Problems in Mathematics", type: "PDF", pages: 120, free: false },
        { title: "Physics Galaxy Vol 1-3", type: "Video Series", duration: "45 hrs", free: true },
        { title: "Organic Chemistry Reactions", type: "PDF", pages: 85, free: true },
        { title: "JEE Advanced Previous Papers", type: "PDF", pages: 200, free: true }
      ]
    },
    {
      name: "NEET Materials",
      icon: FlaskConical,
      color: "from-green-500 to-emerald-500",
      materials: [
        { title: "NCERT Biology Line by Line", type: "PDF", pages: 150, free: true },
        { title: "NEET Physics Shortcuts", type: "PDF", pages: 45, free: true },
        { title: "Chemistry Mind Maps", type: "PDF", pages: 35, free: false },
        { title: "Previous Year NEET Papers", type: "PDF", pages: 180, free: true },
        { title: "Biology Diagram Bank", type: "PDF", pages: 60, free: true }
      ]
    },
    {
      name: "CET Materials",
      icon: Calculator,
      color: "from-blue-500 to-cyan-500",
      materials: [
        { title: "MHT-CET Chapter-wise MCQs", type: "PDF", pages: 95, free: true },
        { title: "Physics Formula Sheet", type: "PDF", pages: 25, free: true },
        { title: "Mathematics Short Tricks", type: "PDF", pages: 40, free: true },
        { title: "CET Mock Test Series", type: "PDF", pages: 110, free: false },
        { title: "Chemistry Quick Revision", type: "PDF", pages: 55, free: true }
      ]
    },
    {
      name: "11th-12th Materials",
      icon: GraduationCap,
      color: "from-orange-500 to-red-500",
      materials: [
        { title: "11th Physics Complete Notes", type: "PDF", pages: 95, free: true },
        { title: "12th Chemistry Solutions", type: "PDF", pages: 85, free: true },
        { title: "Mathematics Formula Book", type: "PDF", pages: 60, free: true },
        { title: "Biology Diagrams", type: "PDF", pages: 45, free: false },
        { title: "Board Exam Practice Papers", type: "PDF", pages: 120, free: true }
      ]
    },
    {
      name: "9th-10th Materials",
      icon: BookOpen,
      color: "from-yellow-500 to-amber-500",
      materials: [
        { title: "Science NCERT Solutions", type: "PDF", pages: 110, free: true },
        { title: "Mathematics Formula Sheet", type: "PDF", pages: 35, free: true },
        { title: "Social Studies Notes", type: "PDF", pages: 85, free: true },
        { title: "English Grammar Guide", type: "PDF", pages: 50, free: true },
        { title: "Foundation Mathematics", type: "PDF", pages: 95, free: false }
      ]
    },
    {
      name: "Video Lectures",
      icon: Video,
      color: "from-indigo-500 to-purple-500",
      materials: [
        { title: "JEE Physics Complete Course", type: "Video", duration: "120 hrs", free: true },
        { title: "NEET Biology Crash Course", type: "Video", duration: "80 hrs", free: false },
        { title: "CET Mathematics Revision", type: "Video", duration: "45 hrs", free: true },
        { title: "Organic Chemistry Tutorials", type: "Video", duration: "60 hrs", free: true },
        { title: "Board Exam Preparation", type: "Video", duration: "90 hrs", free: true }
      ]
    }
  ],
  recentAdditions: [
    { title: "JEE Advanced 2024 Sample Papers", date: "2 days ago", type: "PDF" },
    { title: "NEET 2024 Expected Questions", date: "3 days ago", type: "PDF" },
    { title: "12th Board Exam Tips", date: "5 days ago", type: "Article" },
    { title: "CET Mathematics Shortcuts", date: "1 week ago", type: "Video" }
  ]
};

// Subject filters
const subjects = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English"
];

// Material types
const types = [
  "All Types",
  "PDF",
  "Video",
  "Article",
  "Test Series"
];

export default function StudyMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">Study Materials</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Complete{' '}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Learning Resource
            </span>
          </h1>
          
          <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Access high-quality study materials, notes, video lectures, and practice papers 
            curated by expert faculty
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for study materials, notes, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              <Filter className="h-4 w-4 ml-2 text-zinc-400" />
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedSubject === subject
                      ? "bg-indigo-500 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedType === type
                      ? "bg-indigo-500 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                showFreeOnly
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-white/5 text-zinc-400 border border-white/10"
              }`}
            >
              {showFreeOnly ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              Free Only
            </button>
          </div>
        </motion.div>

        {/* Popular Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Popular Materials
            </h2>
            <Link href="/study-materials/popular" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.popular.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${material.color} bg-opacity-20`}>
                    <material.icon className="h-6 w-6 text-white" />
                  </div>
                  {material.free ? (
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      FREE
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                      PREMIUM
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {material.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-4">{material.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-zinc-300">
                    {material.subject}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-zinc-300">
                    {material.type}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-zinc-300">
                    {material.difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <FileText className="h-4 w-4" />
                      {material.pages} pages
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Download className="h-4 w-4" />
                      {material.downloads}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    <span className="text-sm">{material.rating}</span>
                  </div>
                </div>

                {/* Download Button */}
                <button className="mt-4 w-full py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/30 transition-all flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Now
                </button>

                {/* Hover Effect */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-12 mb-16">
          {studyMaterials.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-linear-to-r ${category.color}`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                </div>
                <Link href={`/study-materials/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              {/* Materials List */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                {category.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/10 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg bg-linear-to-r ${category.color} p-1.5`}>
                        {material.type === "Video" ? (
                          <Video className="h-full w-full text-white" />
                        ) : (
                          <FileText className="h-full w-full text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{material.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-zinc-500">{material.type}</span>
                          {material.pages && (
                            <>
                              <span className="text-xs text-zinc-500">•</span>
                              <span className="text-xs text-zinc-500">{material.pages} pages</span>
                            </>
                          )}
                          {material.duration && (
                            <>
                              <span className="text-xs text-zinc-500">•</span>
                              <span className="text-xs text-zinc-500">{material.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {material.free ? (
                        <span className="text-xs text-green-400">Free</span>
                      ) : (
                        <span className="text-xs text-yellow-400">Premium</span>
                      )}
                      <button className="p-2 hover:bg-indigo-500/20 rounded-lg transition-colors">
                        <Download className="h-4 w-4 text-zinc-400 hover:text-indigo-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Additions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-400" />
            Recent Additions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyMaterials.recentAdditions.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/20">
                    {item.type === "Video" ? (
                      <Video className="h-4 w-4 text-indigo-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-indigo-400" />
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{item.date}</span>
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <span className="text-xs text-indigo-400">{item.type}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center p-6">
            <div className="inline-flex p-4 rounded-full bg-indigo-500/20 mb-4">
              <Download className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Free Downloads</h3>
            <p className="text-sm text-zinc-400">Access 1000+ free study materials</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex p-4 rounded-full bg-indigo-500/20 mb-4">
              <Video className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Video Lectures</h3>
            <p className="text-sm text-zinc-400">Recorded sessions by expert faculty</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex p-4 rounded-full bg-indigo-500/20 mb-4">
              <Layers className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Regular Updates</h3>
            <p className="text-sm text-zinc-400">New materials added weekly</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want Access to Premium Materials?
            </h2>
            <p className="text-zinc-300 mb-8">
              Get unlimited access to all study materials, video lectures, and test series
            </p>
            <Link href="/pricing">
              <button className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all group">
                Upgrade to Premium
                <ChevronRight className="inline-block h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}