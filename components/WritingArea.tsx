'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { refineLetterAction } from '@/app/actions';
import SealAnimation from './SealAnimation';
import { supabase } from '@/lib/supabaseClient';

export default function WritingArea() {
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  
  const [state, setState] = useState<'writing' | 'sealing' | 'sealed' | 'done'>('writing');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  async function handleRefine() {
    if (!content || isRefining) return;
    setIsRefining(true);
    try {
      const refined = await refineLetterAction(content);
      setContent(refined);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to refine. Make sure GROQ_API_KEY is active.");
    } finally {
      setIsRefining(false);
    }
  }

  function handleSeal() {
    if (!content.trim()) return;
    setState('sealing');
    
    // Simulate deliberate pause after sealing animation
    setTimeout(() => {
      setState('sealed');
    }, 4000); // 4 seconds total for the fold + fade
  }

  async function handleKeep() {
    try {
      const letters = JSON.parse(localStorage.getItem('my_letters') || '[]');
      letters.push({ recipient, content, date: new Date().toISOString() });
      localStorage.setItem('my_letters', JSON.stringify(letters));
    } catch(e) {}
    setState('done');
  }

  async function handleLetGo() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('empty.supabase')) {
      alert("Uh oh! .env.local is completely empty. Please make sure you pressed SAVE (Ctrl+S) in your editor and restarted 'npm run dev'.");
      return;
    }

    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("SUPABASE KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    try {
      const { data, error } = await supabase.from('letters').insert([
        {
          recipient: recipient.trim() || null,
          content: content.trim(),
          is_public: true,
        }
      ]);

      if (error) {
        console.error("Insert error:", error);
      }
    } catch(e) {
      console.error("Failed to let go exception:", e);
    }
    setState('done');
  }

  if (state === 'done') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex flex-col items-center justify-center space-y-8 text-center"
      >
        <p className="font-serif text-2xl text-slate-300 font-light italic">
          "I said what I had to say. I can breathe now."
        </p>
        <div className="flex gap-4">
          <a href="/write" onClick={() => setState('writing')} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Write another</a>
          <span className="text-slate-700">|</span>
          <a href="/feed" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Read The Untold Amors</a>
        </div>
      </motion.div>
    );
  }

  if (state === 'sealing' || state === 'sealed') {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence>
          {state === 'sealing' && (
            <SealAnimation recipient={recipient} content={content} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state === 'sealed' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="flex flex-col items-center space-y-12 w-full"
            >
              <p className="font-serif text-2xl text-slate-200 opacity-90 text-center italic font-light">
                "Some words were meant to be felt, not answered."
              </p>
              
              <div className="flex flex-row items-center gap-10">
                <button 
                  onClick={handleKeep}
                  className="group relative px-6 py-2 text-slate-400 hover:text-white transition-colors duration-500"
                >
                  <span className="relative z-10 font-light tracking-wide">Keep it</span>
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-slate-400/0 group-hover:bg-slate-400/50 transition-colors duration-500"></span>
                </button>
                <div className="w-px h-6 bg-slate-800"></div>
                <button 
                  onClick={handleLetGo}
                  className="group relative px-6 py-2 text-slate-400 hover:text-white transition-colors duration-500"
                >
                  <span className="relative z-10 font-light tracking-wide">Let it go</span>
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-slate-400/0 group-hover:bg-slate-400/50 transition-colors duration-500"></span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.5 }}
      className="w-full max-w-2xl mx-auto flex flex-col pt-20 pb-32 px-6 min-h-screen"
    >
      <div className="flex items-center gap-4 mb-10 opacity-70 focus-within:opacity-100 transition-opacity duration-700">
        <label className="text-slate-500 font-serif italic text-xl">To:</label>
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="someone..."
          className="bg-transparent border-none outline-none text-xl font-serif text-slate-300 placeholder:text-slate-700 placeholder:italic w-full focus:ring-0"
        />
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        className="w-full bg-transparent border-none outline-none resize-none text-slate-200 font-serif text-lg leading-loose placeholder:text-slate-800 min-h-[300px] focus:ring-0 overflow-hidden"
      />

      <AnimatePresence>
        {content.trim().length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-12 left-0 right-0 flex justify-center items-center gap-8 pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center gap-6 bg-slate-900/40 backdrop-blur-md px-8 py-4 rounded-full border border-slate-800/50">
              <button 
                onClick={handleRefine}
                disabled={isRefining}
                className="text-sm font-light text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
              >
                {isRefining ? 'Refining...' : 'Refine my words'}
              </button>
              <div className="w-px h-4 bg-slate-700"></div>
              <button 
                onClick={handleSeal}
                className="text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors"
              >
                Seal Letter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
