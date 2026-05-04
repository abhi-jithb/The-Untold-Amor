'use client';

import { motion } from 'framer-motion';

export default function SealAnimation({ recipient, content }: { recipient: string, content: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      animate={{ 
        opacity: [1, 1, 0.5, 0], 
        scale: [1, 0.95, 0.7, 0.4], 
        y: [0, -10, -60, -120],
        rotateX: [0, 20, 75, 90],
        filter: ['blur(0px)', 'blur(2px)', 'blur(6px)', 'blur(12px)'],
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 4, 
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 1]
      }}
      className="w-full max-w-2xl mx-auto p-12 bg-slate-800/10 backdrop-blur-md border border-slate-700/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.05)] origin-bottom relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/95 pointer-events-none z-10" />
      
      <div className="opacity-70 transition-opacity duration-1000">
        {recipient && (
          <div className="mb-6 font-serif italic text-2xl text-slate-300">
            To: {recipient}
          </div>
        )}
        <div className="font-serif text-lg leading-loose text-slate-400 line-clamp-6 text-opacity-80">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
