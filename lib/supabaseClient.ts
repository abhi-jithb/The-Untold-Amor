import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// We use 'https://empty.supabase.co' to prevent the entire app from white-screening if keys are missing
export const supabase = createClient(
  supabaseUrl || 'https://empty.supabase.co',
  supabaseAnonKey || 'empty'
);

