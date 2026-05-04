'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt auto-play, though modern browsers usually block this until user interacts
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Gentle volume
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Auto-play prevented, fine, user can click to play
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/bg-music.mp3"
        loop
        autoPlay
      />
      <motion.button
        onClick={togglePlay}
        className="p-3 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-800/30 text-slate-400 hover:text-slate-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </div>
  );
}
