// app/(main)/about/page.jsx
'use client';

import { motion } from "framer-motion";
import { BookOpen, Users, Target, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <span className="text-sm font-medium text-blue-400">About Us</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to{' '}
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vector Science
            </span>
          </h1>
          
          <p className="text-xl text-zinc-300 leading-relaxed">
            Empowering the next generation of scientists and engineers through 
            comprehensive, accessible online education.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {[
            { label: "Students", value: "10,000+" },
            { label: "Courses", value: "50+" },
            { label: "Instructors", value: "25+" },
            { label: "Countries", value: "30+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {[
            {
              icon: Target,
              title: "Our Mission",
              description: "To provide high-quality science education that's accessible to everyone, anywhere in the world.",
            },
            {
              icon: Award,
              title: "Excellence",
              description: "Industry-leading curriculum designed by experts in physics, chemistry, mathematics, and engineering.",
            },
            {
              icon: Users,
              title: "Community",
              description: "Join a global community of learners and educators passionate about science and technology.",
            },
            {
              icon: BookOpen,
              title: "Resources",
              description: "Access comprehensive study materials, interactive labs, and real-world projects.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-600/0 via-blue-600/5 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              
              <h2 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h2>
              
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-zinc-400 mb-8">
            Join thousands of students already learning with Vector Science.
          </p>
          
          <Link href="/courses">
            <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all group">
              Explore Courses
              <ChevronRight className="inline-block h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}