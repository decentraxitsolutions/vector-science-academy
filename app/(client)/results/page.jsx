// app/(main)/results/page.jsx
'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Medal, 
  Star, 
  GraduationCap,
  ChevronRight,
  Filter,
  Sparkles,
  Crown,
  Target,
  Users,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Results data organized by course
const resultsData = {
  jee: {
    title: "JEE Advanced & Mains",
    icon: Trophy,
    color: "from-purple-500 to-pink-500",
    stats: {
      totalSelected: "250+",
      topRank: "AIR 42",
      percentile: "99.9%",
      avgRank: "Under 5000"
    },
    toppers: [
      { name: "Rahul Sharma", rank: "AIR 42", marks: "295/300", year: "2024", image: "/toppers/rahul.jpg" },
      { name: "Priya Patel", rank: "AIR 128", marks: "289/300", year: "2024", image: "/toppers/priya.jpg" },
      { name: "Amit Kumar", rank: "AIR 256", marks: "285/300", year: "2024", image: "/toppers/amit.jpg" },
      { name: "Sneha Reddy", rank: "AIR 389", marks: "278/300", year: "2023", image: "/toppers/sneha.jpg" },
    ],
    highlights: [
      "15 students under AIR 1000",
      "45 students under AIR 5000",
      "85% selection rate in Mains",
      "Perfect score in Mathematics (4 students)"
    ]
  },
  neet: {
    title: "NEET (UG)",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    stats: {
      totalSelected: "200+",
      topRank: "AIR 156",
      percentile: "99.8%",
      avgRank: "Under 3000"
    },
    toppers: [
      { name: "Neha Gupta", rank: "AIR 156", marks: "695/720", year: "2024", image: "/toppers/neha.jpg" },
      { name: "Rohan Desai", rank: "AIR 289", marks: "688/720", year: "2024", image: "/toppers/rohan.jpg" },
      { name: "Anjali Singh", rank: "AIR 445", marks: "675/720", year: "2024", image: "/toppers/anjali.jpg" },
      { name: "Karthik Nair", rank: "AIR 678", marks: "668/720", year: "2023", image: "/toppers/karthik.jpg" },
    ],
    highlights: [
      "8 students under AIR 500",
      "28 students under AIR 2000",
      "92% selection rate",
      "Biology average score 340+"
    ]
  },
  cet: {
    title: "MHT-CET",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    stats: {
      totalSelected: "500+",
      topRank: "State Rank 7",
      percentile: "99.95%",
      avgRank: "Under 500"
    },
    toppers: [
      { name: "Siddhesh Patil", rank: "State Rank 7", marks: "198/200", year: "2024", image: "/toppers/siddhesh.jpg" },
      { name: "Pooja Jadhav", rank: "State Rank 12", marks: "197/200", year: "2024", image: "/toppers/pooja.jpg" },
      { name: "Omkar More", rank: "State Rank 25", marks: "195/200", year: "2024", image: "/toppers/omkar.jpg" },
      { name: "Shrutika Sawant", rank: "State Rank 38", marks: "194/200", year: "2023", image: "/toppers/shrutika.jpg" },
    ],
    highlights: [
      "5 students in State Top 50",
      "25 students in State Top 100",
      "95% selection rate in top colleges",
      "Perfect scores in Mathematics (8 students)"
    ]
  },
  hsc: {
    title: "HSC Board (12th)",
    icon: GraduationCap,
    color: "from-orange-500 to-red-500",
    stats: {
      totalStudents: "300+",
      topScore: "95.6%",
      avgScore: "82%",
      distinction: "150+"
    },
    toppers: [
      { name: "Aditya Joshi", rank: "99.6%", marks: "498/500", year: "2024", image: "/toppers/aditya.jpg" },
      { name: "Sanika Kale", rank: "98.8%", marks: "494/500", year: "2024", image: "/toppers/sanika.jpg" },
      { name: "Vedant Kulkarni", rank: "98.2%", marks: "491/500", year: "2024", image: "/toppers/vedant.jpg" },
      { name: "Rutuja Pawar", rank: "97.8%", marks: "489/500", year: "2023", image: "/toppers/rutuja.jpg" },
    ],
    highlights: [
      "12 students above 95%",
      "45 students above 90%",
      "100% pass percentage",
      "Subject toppers in Physics, Chemistry, Maths"
    ]
  },
  ssc: {
    title: "SSC Board (10th)",
    icon: Star,
    color: "from-yellow-500 to-amber-500",
    stats: {
      totalStudents: "400+",
      topScore: "98.8%",
      avgScore: "85%",
      distinction: "200+"
    },
    toppers: [
      { name: "Atharva Deshmukh", rank: "98.8%", marks: "494/500", year: "2024", image: "/toppers/atharva.jpg" },
      { name: "Gauri Shinde", rank: "98.2%", marks: "491/500", year: "2024", image: "/toppers/gauri.jpg" },
      { name: "Prathamesh Yadav", rank: "97.6%", marks: "488/500", year: "2024", image: "/toppers/prathamesh.jpg" },
      { name: "Isha More", rank: "97.2%", marks: "486/500", year: "2023", image: "/toppers/isha.jpg" },
    ],
    highlights: [
      "18 students above 95%",
      "65 students above 90%",
      "100% pass percentage",
      "Math average score 95+"
    ]
  }
};

// Year filter options
const years = ["2024", "2023", "2022", "2021"];

export default function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const courses = [
    { id: "all", name: "All Courses", icon: Target },
    { id: "jee", name: "JEE", icon: Trophy },
    { id: "neet", name: "NEET", icon: Award },
    { id: "cet", name: "CET", icon: TrendingUp },
    { id: "hsc", name: "HSC", icon: GraduationCap },
    { id: "ssc", name: "SSC", icon: Star },
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-500">Our Results</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Celebrating{' '}
            <span className="bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Student Success
            </span>
          </h1>
          
          <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Year after year, our students achieve outstanding results in competitive exams 
            and board examinations
          </p>
        </motion.div>

        {/* Overall Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-linear-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-sm text-zinc-400">Total Selections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-sm text-zinc-400">Under AIR 1000</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-sm text-zinc-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15</div>
                <div className="text-sm text-zinc-400">State Ranks</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Course Filter */}
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCourse === course.id
                      ? "bg-yellow-500 text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <course.icon className="h-4 w-4" />
                  {course.name}
                </button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-400" />
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedYear === year
                      ? "bg-yellow-500 text-black"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results by Course */}
        <div className="space-y-20">
          {Object.entries(resultsData).map(([key, course], index) => {
            if (selectedCourse !== "all" && selectedCourse !== key) return null;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {/* Course Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${course.color} bg-opacity-20`}>
                    <course.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{course.stats.totalSelected || course.stats.totalStudents}</div>
                    <div className="text-sm text-zinc-400">Total Selections</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{course.stats.topRank}</div>
                    <div className="text-sm text-zinc-400">Top Rank</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{course.stats.percentile || course.stats.avgScore}</div>
                    <div className="text-sm text-zinc-400">Highest Score</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{course.stats.avgRank || course.stats.distinction}</div>
                    <div className="text-sm text-zinc-400">Average Rank/Score</div>
                  </div>
                </div>

                {/* Toppers Grid */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Top Performers {selectedYear}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {course.toppers
                      .filter(t => t.year === selectedYear)
                      .map((topper, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          className="relative group"
                        >
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3">
                              {/* Profile Image Placeholder */}
                              <div className={`w-12 h-12 rounded-full bg-linear-to-r ${course.color} flex items-center justify-center text-white font-bold text-xl`}>
                                {topper.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{topper.name}</h4>
                                <p className="text-sm text-yellow-500">{topper.rank}</p>
                                <p className="text-xs text-zinc-400">{topper.marks}</p>
                              </div>
                            </div>
                            
                            {/* Sparkle Effect */}
                            <Sparkles className="absolute top-2 right-2 h-4 w-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-sm font-semibold text-zinc-400 mb-3">KEY HIGHLIGHTS</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {course.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-zinc-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Success Stories Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Student <span className="text-yellow-500">Success Stories</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Patil",
                achievement: "AIR 42 JEE Advanced 2024",
                quote: "Vector Science's structured approach and mentorship helped me achieve my dream rank. The faculty's guidance was invaluable.",
                image: "/testimonials/rajesh.jpg"
              },
              {
                name: "Dr. Sneha Kulkarni",
                achievement: "MBBS at Grant Medical College",
                quote: "The NEET preparation at Vector Science was comprehensive. Regular tests and doubt-solving sessions made all the difference.",
                image: "/testimonials/sneha.jpg"
              },
              {
                name: "Amit Shah",
                achievement: "98.8% in HSC, CET State Rank 7",
                quote: "From board exams to competitive tests, Vector Science prepared me for everything. Grateful for the support!",
                image: "/testimonials/amit.jpg"
              }
            ].map((story, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{story.name}</h3>
                    <p className="text-xs text-yellow-500">{story.achievement}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm italic">"{story.quote}"</p>
                <div className="mt-4 flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Year-wise Performance Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 p-8 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Year-wise Performance Trend
          </h3>
          <div className="h-64 flex items-end gap-4">
            {[2021, 2022, 2023, 2024].map((year, i) => (
              <div key={year} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${[70, 80, 90, 100][i]}px` }}
                  transition={{ duration: 1, delay: 1 + i * 0.1 }}
                  className="w-full bg-linear-to-t from-yellow-500 to-orange-500 rounded-t-lg"
                  style={{ height: `${[70, 80, 90, 100][i]}px` }}
                />
                <span className="text-sm text-zinc-400">{year}</span>
                <span className="text-xs text-yellow-500">{['85%', '90%', '93%', '95%'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-linear-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Be the Next Success Story
            </h2>
            <p className="text-zinc-300 mb-8">
              Join Vector Science and start your journey towards academic excellence
            </p>
            <Link href="/courses">
              <button className="px-8 py-4 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all group">
                Explore Courses
                <ChevronRight className="inline-block h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}