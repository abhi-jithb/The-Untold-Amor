'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LetterCard({ content }: { content: string }) {
  const [felt, setFelt] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-2xl mx-auto py-16 border-b border-white/5 last:border-0 relative group"
    >
      <p className="font-serif text-lg leading-loose text-slate-300 opacity-90 whitespace-pre-wrap">
        {content}
      </p>

      <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <button 
          onClick={() => setFelt(true)}
          disabled={felt}
          className={`flex items-center gap-2 text-sm font-light transition-colors duration-500 ${felt ? 'text-rose-900/50 cursor-default' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <Heart size={14} className={felt ? 'fill-rose-900/50' : ''} />
          <span>{felt ? 'You felt this' : 'I felt this'}</span>
        </button>
      </div>
    </motion.div>
  );
}
