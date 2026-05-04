'use server';

import { refineWords } from '@/lib/groqClient';

export async function refineLetterAction(text: string): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const refined = await refineWords(text);
    return { success: true, data: refined };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error?.message || 'Failed to refine words. The universe is busy.' };
  }
}
