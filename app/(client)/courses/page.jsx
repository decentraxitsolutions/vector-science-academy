// app/(main)/courses/page.jsx
'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FlaskConical, 
  Calculator, 
  BookOpen, 
  Atom, 
  GraduationCap, 
  Target, 
  ChevronRight,
  Rocket,
  Brain,
  Puzzle
} from "lucide-react";

const courseCategories = [
  {
    title: "Competitive Exams",
    description: "Comprehensive preparation for engineering and medical entrance exams",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    courses: [
      { name: "JEE Advanced + Mains", duration: "2 Years", students: "5000+", icon: Rocket },
      { name: "NEET (UG)", duration: "2 Years", students: "4500+", icon: FlaskConical },
      { name: "CET (Maharashtra)", duration: "1 Year", students: "3000+", icon: Calculator },
    ]
  },
  {
    title: "Higher Secondary",
    description: "11th & 12th Science stream with specialization",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    courses: [
      { name: "11th Science (PCM)", duration: "1 Year", students: "2000+", icon: Atom },
      { name: "11th Science (PCB)", duration: "1 Year", students: "1800+", icon: FlaskConical },
      { name: "12th Science (PCM)", duration: "1 Year", students: "2200+", icon: Calculator },
      { name: "12th Science (PCB)", duration: "1 Year", students: "1900+", icon: Brain },
    ]
  },
  {
    title: "Secondary Education",
    description: "9th & 10th standard - Regular & Foundation courses",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    courses: [
      { name: "9th Regular", duration: "1 Year", students: "1500+", icon: BookOpen },
      { name: "10th Regular", duration: "1 Year", students: "1600+", icon: BookOpen },
      { name: "9th Foundation (JEE/NEET)", duration: "2 Years", students: "800+", icon: Puzzle },
      { name: "10th Foundation (JEE/NEET)", duration: "2 Years", students: "900+", icon: Rocket },
    ]
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <GraduationCap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Our Courses</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your{' '}
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Learning Path
            </span>
          </h1>
          
          <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Comprehensive courses designed by experts to help you excel in academics 
            and competitive exams
          </p>
        </motion.div>

        {/* Course Categories */}
        <div className="space-y-20">
          {courseCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-linear-to-r ${category.color} bg-opacity-20`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-zinc-400">{category.description}</p>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.courses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative"
                  >
                    <Link href={`/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`}>
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
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-32"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Vector Science?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Expert Faculty",
                description: "Learn from IITians, Doctors, and experienced educators"
              },
              {
                icon: Rocket,
                title: "Proven Results",
                description: "Regular top ranks in JEE, NEET, and CET examinations"
              },
              {
                icon: BookOpen,
                title: "Comprehensive Material",
                description: "Well-researched study material and regular assessments"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="inline-flex p-4 rounded-full bg-blue-500/20 mb-4">
                  <item.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-32 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-linear-to-r from-blue-600/20 to-indigo-600/20 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-zinc-300 mb-8">
              Get in touch with us for course details, fees, and admission process
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all group">
                Contact Admissions
                <ChevronRight className="inline-block h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}