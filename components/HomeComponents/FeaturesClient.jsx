'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, Target, Users } from 'lucide-react';

const features = [
  {
    icon: <Video className="h-6 w-6 text-blue-400" />,
    title: "High-Definition Lectures",
    description: "Stream crystal clear video lectures optimized for low bandwidth without any buffering interruptions."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-indigo-400" />,
    title: "Structured Curriculum",
    description: "Strictly aligned with latest exam patterns ensuring you study exactly what matters most."
  },
  {
    icon: <Target className="h-6 w-6 text-purple-400" />,
    title: "Mock Assessments",
    description: "Regular tests and detailed analytics to identify your weak spots and track your improvement."
  },
  {
    icon: <Users className="h-6 w-6 text-emerald-400" />,
    title: "Dedicated Doubt Solving",
    description: "Connect directly with expert faculty to resolve complex conceptual doubts in real time."
  }
];

export default function FeaturesClient() {
  return (
    <section className="w-full py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Vector Science?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Everything you need to secure top ranks, built into one seamless platform.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm hover:bg-white/6 hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}