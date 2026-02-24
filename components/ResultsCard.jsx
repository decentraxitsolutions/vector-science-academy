// components/ResultsCard.jsx
'use client';

import { motion } from "framer-motion";
import { Trophy, Award, TrendingUp, Star, Crown, Sparkles } from "lucide-react";

export default function ResultsCard({ result, index }) {
  const icons = {
    jee: Trophy,
    neet: Award,
    cet: TrendingUp,
    hsc: Star,
    ssc: Star
  };

  const Icon = icons[result.id] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-linear-to-r ${result.color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{result.title}</h3>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-400">Top Rank</span>
          <span className="text-white font-semibold">{result.stats.topRank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-400">Selections</span>
          <span className="text-white font-semibold">{result.stats.totalSelected}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-400">Success Rate</span>
          <span className="text-green-500 font-semibold">{result.stats.percentile}</span>
        </div>
      </div>

      {/* Topper Preview */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-500" />
          <span className="text-xs text-zinc-400">Top Performer</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full bg-linear-to-r ${result.color} flex items-center justify-center text-white font-bold text-sm`}>
            {result.toppers[0].name.charAt(0)}
          </div>
          <div>
            <p className="text-sm text-white">{result.toppers[0].name}</p>
            <p className="text-xs text-yellow-500">{result.toppers[0].rank}</p>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles className="h-4 w-4 text-yellow-500" />
      </div>
    </motion.div>
  );
}