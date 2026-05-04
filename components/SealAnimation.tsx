'use client';

import { motion } from 'framer-motion';

export default function SealAnimation({ recipient, content }: { recipient: string, content: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      animate={{ 
        opacity: [1, 0.8, 0], 
        scale: [1, 0.9, 0.6], 
        y: [0, -20, -100],
        rotateX: [0, 20, 60]
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 3, 
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.6, 1]
      }}
      className="w-full max-w-2xl mx-auto p-12 bg-slate-900/20 backdrop-blur-sm border border-slate-800/30 rounded-lg shadow-2xl origin-bottom relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none z-10" />
      
      <div className="opacity-40">
        {recipient && (
          <div className="mb-6 font-serif italic text-xl text-slate-400">
            To: {recipient}
          </div>
        )}
        <div className="font-serif text-lg leading-loose text-slate-500 line-clamp-6 text-opacity-50 blur-[1px]">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
