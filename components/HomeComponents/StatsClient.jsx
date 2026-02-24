'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: "50+", label: "Expert Faculty" },
  { value: "10k+", label: "Students Enrolled" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Platform Access" }
];

export default function StatsClient() {
  return (
    <section className="w-full py-24 relative z-10 mb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-12 md:p-20 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2"
                >
                  {stat.value}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="text-sm md:text-base font-medium text-blue-400 uppercase tracking-wider"
                >
                  {stat.label}
                </motion.span>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}