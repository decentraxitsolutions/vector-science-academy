'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

export default function FooterClient() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/10 bg-black/40 backdrop-blur-xl pt-20 pb-10 overflow-hidden mt-auto z-10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/20">
                <BookOpen className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                Vector<span className="text-blue-500">Science</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Empowering the next generation of innovators with top-tier education in Physics, Chemistry, and Mathematics.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-400 hover:text-white hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-pink-600 hover:text-white hover:shadow-[0_0_15px_rgba(219,39,119,0.5)] transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-white font-bold text-lg tracking-wide">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {['About Us', 'Our Courses', 'Faculty Members', 'Student Success', 'Contact Support'].map((item) => (
                <Link key={item} href="#" className="text-zinc-400 text-sm hover:text-blue-400 hover:translate-x-1 transition-all w-fit flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 transition-all" />
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-white font-bold text-lg tracking-wide">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Vector Science Academy<br />
                  Main Campus, Pandharpur<br />
                  Maharashtra, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <p className="text-zinc-400 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <p className="text-zinc-400 text-sm">admissions@vectorscience.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-white font-bold text-lg tracking-wide">Newsletter</h3>
            <p className="text-zinc-400 text-sm">Subscribe to get the latest updates on new batches and exam notifications.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
              >
                Subscribe Now
              </button>
            </form>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {currentYear} Vector Science Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-zinc-500 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-zinc-500 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none translate-y-1/2 translate-x-1/4"></div>
    </footer>
  );
}