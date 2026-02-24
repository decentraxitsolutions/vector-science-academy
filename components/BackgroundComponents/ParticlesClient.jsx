'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ParticlesClient() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 40 random glowing tech-orbs
    const generateParticles = () => {
      return Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // Random horizontal start position
        y: Math.random() * 100, // Random vertical start position
        size: Math.random() * 4 + 1, // Random size between 1px and 5px
        duration: Math.random() * 20 + 15, // Float duration (15s to 35s)
        delay: Math.random() * 10, // Staggered start times
      }));
    };
    setParticles(generateParticles());
  }, []);

  return (
    // The background gradient creates the deep space/dark tech vibe
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -1000], // Float endlessly upwards
            x: [0, Math.random() * 50 - 25], // Drift gently left or right
            opacity: [0, 1, 0], // Fade in, glow, and fade out before resetting
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}