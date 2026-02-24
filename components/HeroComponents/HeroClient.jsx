'use client';

import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function HeroClient({ dashboardRoute }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          Admissions Open for 2026 Batches
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Master Science with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
            Expert Guidance
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-zinc-400"
        >
          Join Vector Science Academy to build a rock-solid foundation in Physics, Chemistry, and Math. Seamlessly access your dedicated portal.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {dashboardRoute ? (
            <Link 
              href={dashboardRoute} 
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </SignInButton>
          )}
          
          <Link 
            href="#demo" 
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md transition-all"
          >
            <PlayCircle className="mr-2 h-5 w-5 text-blue-400" />
            Watch Demo
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
}