import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'placeholder-key',
});

/**
 * Refines the text gently without altering the emotional core.
 */
export async function refineWords(text: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Groq API Key is not configured. Please add it to your environment variables.');
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a gentle editor. The user provides an emotionally vulnerable letter. Clean up obvious grammar or spelling issues and gently clarify the phrasing if confusing, but absolutely DO NOT alter the emotional register, meaning, or voice. Do not add advice or commentary. Return ONLY the refined letter text.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.3,
    });
    
    return chatCompletion.choices[0]?.message?.content || text;
  } catch (error: any) {
    console.error("Groq refinement failed:", error);
    throw new Error(error?.message || 'Failed to refine words. The universe is busy.');
  }
}
