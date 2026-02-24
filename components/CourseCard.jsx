// components/CourseCard.jsx
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CourseCard({ course, category, index, categoryIndex }) {
  const slug = course.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <Link href={`/courses/${slug}`}>
        <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden">
          
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${category.color} p-2.5 mb-4 shadow-lg`}>
            <course.icon className="h-full w-full text-white" />
          </div>
          
          {/* Course Info */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {course.name}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-zinc-400">
              <span className="w-16">Duration:</span>
              <span className="text-white font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center text-sm text-zinc-400">
              <span className="w-16">Students:</span>
              <span className="text-white font-medium">{course.students}</span>
            </div>
          </div>
          
          {/* View Details Link */}
          <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
            View Details 
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
}