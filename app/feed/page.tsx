export const dynamic = 'force-dynamic';

import LetterCard from '@/components/LetterCard';
import { supabase } from '@/lib/supabaseClient';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Whisper Wall - The Untold Amor',
};

const MOCK_LETTERS = [
  {
    id: "1",
    content: "I saw someone today who walked just like you. For a second, my heart stopped. I don't know why I expected you to turn around. You live so far away now. I hope you're happy."
  },
  {
    id: "2",
    content: "I still have that book you gave me. I read it sometimes when the rain is heavy and I can't sleep. The words changed meaning since you left."
  },
  {
    id: "3",
    content: "Some words don't need replies. You can love, without being loved back. I learned that from you."
  }
];

export default async function FeedPage() {
  let letters = [];
  
  try {
    const { data, error } = await supabase
      .from('letters')
      .select('id, content')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error || !data || data.length === 0) {
      letters = MOCK_LETTERS;
    } else {
      letters = data;
    }
  } catch (err) {
    letters = MOCK_LETTERS;
  }

  return (
    <main className="flex-1 w-full flex flex-col py-24 px-6 relative animate-in fade-in duration-1000 min-h-screen">
      <div className="max-w-2xl mx-auto w-full mb-20 text-center relative">
        <h1 className="font-serif text-3xl font-light text-slate-400 italic mb-4">
          Whisper Wall
        </h1>
        <p className="text-sm font-light text-slate-600">
          Words let go, found by others.
        </p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        {letters.map((letter) => (
          <LetterCard key={letter.id} content={letter.content} />
        ))}
        
        {letters.length === 0 && (
          <div className="text-center text-slate-500 font-light italic mt-20">
            It's quiet here.
          </div>
        )}
      </div>
      
      <div className="mt-32 pb-16 text-center">
        <Link 
          href="/write" 
          className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          Write yours
        </Link>
      </div>
    </main>
  );
}
