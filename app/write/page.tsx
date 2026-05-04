import WritingArea from '@/components/WritingArea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write - The Untold Amor',
};

export default function WritePage() {
  return (
    <main className="flex-1 w-full animate-in fade-in duration-1000">
      <WritingArea />
    </main>
  );
}
