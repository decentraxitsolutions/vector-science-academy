// app/(main)/courses/[slug]/page.jsx
'use client';

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  CheckCircle, 
  ChevronLeft,
  Calendar,
  Award,
  FileText,
  Video,
  MessageCircle
} from "lucide-react";

// Course data (in a real app, this would come from a database)
const courseDetails = {
  'jee-advanced-+-mains': {
    name: 'JEE Advanced + Mains',
    category: 'Competitive Exams',
    duration: '2 Years',
    students: '5000+',
    description: 'Comprehensive preparation program for IIT-JEE Advanced and Mains examinations.',
    fullDescription: 'Our flagship JEE program is designed to help students crack one of the toughest engineering entrance exams in India. With experienced faculty, comprehensive study material, and regular mock tests, we ensure students are well-prepared for both JEE Mains and Advanced.',
    curriculum: [
      'Physics: Mechanics, Electrodynamics, Modern Physics, Optics',
      'Chemistry: Physical, Organic, Inorganic Chemistry',
      'Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry'
    ],
    features: [
      'Live & Recorded Lectures',
      'Weekly Mock Tests',
      'Doubt Clearing Sessions',
      'Personalized Mentorship',
      'Study Material Package',
      'Performance Analytics'
    ],
    schedule: 'Weekend batches + Weekday evening batches',
    eligibility: 'Students appearing for 12th or passed 12th',
    fee: 'Contact for fee structure'
  },
  'neet-ug': {
    name: 'NEET (UG)',
    category: 'Competitive Exams',
    duration: '2 Years',
    students: '4500+',
    description: 'Comprehensive preparation for National Eligibility cum Entrance Test.',
    fullDescription: 'Our NEET program is tailored to help medical aspirants excel in the national medical entrance exam. With focus on NCERT and beyond, we ensure students master Biology, Physics, and Chemistry.',
    curriculum: [
      'Biology: Botany, Zoology, Human Physiology',
      'Physics: Mechanics, Thermodynamics, Optics',
      'Chemistry: Organic, Inorganic, Physical Chemistry'
    ],
    features: [
      'NCERT Focused Approach',
      'Regular Mock Tests',
      'Doubt Resolution',
      'Biology Special Classes',
      'Previous Year Analysis',
      'Study Material'
    ],
    schedule: 'Weekend and weekday batches available',
    eligibility: '12th appearing or passed with PCB',
    fee: 'Contact for fee structure'
  },
  'cet-maharashtra': {
    name: 'CET (Maharashtra)',
    category: 'Competitive Exams',
    duration: '1 Year',
    students: '3000+',
    description: 'Targeted preparation for Maharashtra Common Entrance Test.',
    fullDescription: 'Specialized program for MHT-CET with focus on state board curriculum and exam pattern. Our faculty helps students master the specific requirements of Maharashtra CET.',
    curriculum: [
      'Physics: Maharashtra Board Focus',
      'Chemistry: State Board aligned',
      'Mathematics/Biology: As per CET pattern'
    ],
    features: [
      'State Board Alignment',
      'CET Specific Practice',
      'Chapter-wise Tests',
      'Quick Revision Modules',
      'Doubt Clearing',
      'Mock Tests'
    ],
    schedule: 'Flexible batch timings',
    eligibility: '12th appearing or passed (Maharashtra Board)',
    fee: 'Contact for fee structure'
  },
  '11th-science-pcm': {
    name: '11th Science (PCM)',
    category: 'Higher Secondary',
    duration: '1 Year',
    students: '2000+',
    description: 'Comprehensive PCM program for 11th Science students.',
    fullDescription: 'Build a strong foundation in Physics, Chemistry, and Mathematics with our expert faculty. This program prepares students for both board exams and competitive exams.',
    curriculum: [
      'Physics: Basic concepts, Mechanics',
      'Chemistry: Fundamental concepts',
      'Mathematics: Algebra, Trigonometry'
    ],
    features: [
      'Board Exam Focus',
      'Competitive Foundation',
      'Regular Tests',
      'Doubt Sessions',
      'Study Material',
      'Progress Tracking'
    ],
    schedule: 'Regular classes',
    eligibility: 'Passed 10th',
    fee: 'Contact for fee structure'
  },
  '11th-science-pcb': {
    name: '11th Science (PCB)',
    category: 'Higher Secondary',
    duration: '1 Year',
    students: '1800+',
    description: 'Comprehensive PCB program for 11th Science students.',
    fullDescription: 'Excel in Biology, Chemistry, and Physics with our specialized program. Perfect for students aiming for medical careers.',
    curriculum: [
      'Biology: Botany, Zoology',
      'Chemistry: Physical, Organic',
      'Physics: Fundamentals'
    ],
    features: [
      'Biology Focus',
      'Medical Foundation',
      'Lab Sessions',
      'Regular Assessment',
      'Study Material',
      'Doubt Clearing'
    ],
    schedule: 'Regular classes',
    eligibility: 'Passed 10th',
    fee: 'Contact for fee structure'
  },
  '9th-regular': {
    name: '9th Regular',
    category: 'Secondary Education',
    duration: '1 Year',
    students: '1500+',
    description: 'Complete coverage of 9th standard curriculum.',
    fullDescription: 'Strengthen concepts in Mathematics and Science with our regular program. Focus on building strong fundamentals for future success.',
    curriculum: [
      'Mathematics: Algebra, Geometry',
      'Science: Physics, Chemistry, Biology',
      'English & Social Studies'
    ],
    features: [
      'School Syllabus Coverage',
      'Regular Tests',
      'Homework Support',
      'Concept Building',
      'Doubt Sessions',
      'Parent-Teacher Meetings'
    ],
    schedule: 'Weekday/Weekend options',
    eligibility: 'Passed 8th',
    fee: 'Contact for fee structure'
  },
  '10th-regular': {
    name: '10th Regular',
    category: 'Secondary Education',
    duration: '1 Year',
    students: '1600+',
    description: 'Comprehensive 10th standard preparation.',
    fullDescription: 'Excel in your 10th board exams with our systematic approach. We focus on concept clarity and exam techniques.',
    curriculum: [
      'Mathematics: All topics',
      'Science: Complete syllabus',
      'Social Studies & English'
    ],
    features: [
      'Board Exam Focus',
      'Previous Papers',
      'Revision Techniques',
      'Time Management',
      'Stress Management',
      'Extra Classes'
    ],
    schedule: 'Regular batches',
    eligibility: 'Passed 9th',
    fee: 'Contact for fee structure'
  },
  '9th-foundation-jeeneet': {
    name: '9th Foundation (JEE/NEET)',
    category: 'Secondary Education',
    duration: '2 Years',
    students: '800+',
    description: 'Early foundation program for JEE/NEET aspirants.',
    fullDescription: 'Start your competitive exam preparation early. Build strong fundamentals from 9th standard itself.',
    curriculum: [
      'Advanced Mathematics',
      'Science Fundamentals',
      'Logical Reasoning',
      'Problem Solving'
    ],
    features: [
      'Early Bird Advantage',
      'Olympiad Preparation',
      'Concept Deep Dive',
      'Competitive Mindset',
      'Regular Tests',
      'Mentorship'
    ],
    schedule: 'Special batches',
    eligibility: 'Passed 8th with good marks',
    fee: 'Contact for fee structure'
  },
  '10th-foundation-jeeneet': {
    name: '10th Foundation (JEE/NEET)',
    category: 'Secondary Education',
    duration: '2 Years',
    students: '900+',
    description: 'Foundation program for competitive exams from 10th.',
    fullDescription: 'Bridge the gap between school education and competitive exam preparation. Perfect for serious aspirants.',
    curriculum: [
      'Advanced Problem Solving',
      'Science Deep Dive',
      'Math Excellence',
      'Exam Strategies'
    ],
    features: [
      'Head Start for JEE/NEET',
      'Advanced Concepts',
      'Practice Sessions',
      'Mock Tests',
      'Performance Analysis',
      'Career Guidance'
    ],
    schedule: 'Weekend + Holidays',
    eligibility: 'Passed 9th with distinction',
    fee: 'Contact for fee structure'
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const course = courseDetails[params.slug];

  if (!course) {
    return (
      <div className="min-h-screen bg-zinc-900 pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl text-white">Course not found</h1>
          <Link href="/courses" className="text-blue-400 mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <Link href="/courses">
          <button className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>
        </Link>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
              {course.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {course.name}
          </h1>
          
          <p className="text-xl text-zinc-300 mb-8">
            {course.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Clock className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-zinc-400">Duration</div>
              <div className="text-white font-semibold">{course.duration}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Users className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-zinc-400">Students</div>
              <div className="text-white font-semibold">{course.students}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-zinc-400">Schedule</div>
              <div className="text-white font-semibold text-sm">{course.schedule}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Award className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-zinc-400">Eligibility</div>
              <div className="text-white font-semibold text-sm">{course.eligibility}</div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">About the Course</h2>
            <p className="text-zinc-300 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>

          {/* Curriculum */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Curriculum</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {course.curriculum.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Course Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {course.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-linear-to-r from-blue-600/20 to-indigo-600/20 border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Enroll?</h3>
            <p className="text-zinc-300 mb-6">Contact us for fees and admission details</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
                Enroll Now
              </button>
              <button className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-semibold transition-all">
                Request Callback
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}