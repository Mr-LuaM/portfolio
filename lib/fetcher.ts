import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type SortOption = {
  column: string;
  ascending?: boolean;
  nullsFirst?: boolean;
};

export async function fetcher<T>(table: string): Promise<T[]>;
export async function fetcher<T>(table: string, options: { sort?: SortOption[] }): Promise<T[]>;
export async function fetcher<T>(table: string, options?: { sort?: SortOption[] }): Promise<T[]> {
  let query = supabase.from(table).select("*");

  if (options?.sort) {
    for (const sortRule of options.sort) {
      query = query.order(sortRule.column, {
        ascending: sortRule.ascending ?? true,
        nullsFirst: sortRule.nullsFirst ?? false,
      });
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as T[];
}
