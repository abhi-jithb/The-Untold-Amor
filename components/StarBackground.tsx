'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate static stars once mounted on client
    const generatedStars: Star[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 30, // 30-50s
      delay: Math.random() * -30,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051024] via-slate-950 to-slate-950">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-slate-300 opacity-20"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            y: {
              duration: star.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: star.delay,
            },
            opacity: {
              duration: star.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            },
          }}
        />
      ))}
    </div>
  );
}
