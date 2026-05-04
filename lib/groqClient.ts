import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'placeholder-key',
});

/**
 * Refines the text gently without altering the emotional core.
 */
export async function refineWords(text: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    // If no key, gracefully return the original text
    return text;
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
  } catch (error) {
    console.warn("Groq refinement failed:", error);
    return text;
  }
}
