import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Untold Amor',
};

export default function LandingPage() {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-100 font-light tracking-[0.02em] leading-tight mb-12 opacity-90">
        Write what you never sent.
      </h1>
      
      <Link 
        href="/write" 
        className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-slate-300 transition-colors duration-500 hover:text-white"
      >
        <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-px">
          Start Writing
        </span>
        <span className="absolute inset-0 rounded-full bg-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></span>
      </Link>
    </main>
  );
}
