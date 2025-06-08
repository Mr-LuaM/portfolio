// lib/fetcher.ts
import { createClient } from "@/lib/supabase/client"; // Import your Supabase client

const supabase = createClient();

// Make fetcher generic so it can work with different types
export const fetcher = async <T>(table: string): Promise<T[]> => {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data as T[];
};
