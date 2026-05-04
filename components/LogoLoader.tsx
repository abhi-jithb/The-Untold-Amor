'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-all duration-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-32 h-32 md:w-48 md:h-48"
      >
        <Image 
          src="/untold_amor_logo.svg" 
          alt="Loading..." 
          fill
          className="object-contain opacity-80"
          priority
        />
      </motion.div>
    </div>
  );
}
