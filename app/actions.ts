'use server';

import { refineWords } from '@/lib/groqClient';

export async function refineLetterAction(text: string) {
  return await refineWords(text);
}
