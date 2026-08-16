import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Публичен клиент — за четене на новини, документи, галерия от сайта
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
