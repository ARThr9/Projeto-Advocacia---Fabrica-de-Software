import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cria e exporta o cliente Supabase para ser usado em outros arquivos
export const supabase = createClient(supabaseUrl, supabaseKey);
