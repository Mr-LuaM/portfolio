import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type SortOption = {
  column: string;
  ascending?: boolean;
  nullsFirst?: boolean;
};

type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "not";

type FilterOption<T> = {
  column: keyof T & string; // only allow keys of T as column names
  operator: FilterOperator;
  value: string | number | boolean | null | string[]; // stricter allowed types
};

type FetchOptions<T> = {
  sort?: SortOption[];
  relations?: string;
  filter?: FilterOption<T>[];
};

export async function fetcher<T>(
  table: string, 
  options?: FetchOptions<T>
): Promise<T[]> {
  let query = supabase.from(table).select(options?.relations ?? "*");

  // Apply sorting
  if (options?.sort) {
    for (const sortRule of options.sort) {
      query = query.order(sortRule.column, {
        ascending: sortRule.ascending ?? true,
        nullsFirst: sortRule.nullsFirst ?? false,
      });
    }
  }

  // Apply filtering
  if (options?.filter) {
    for (const filterRule of options.filter) {
      query = query.filter(
        filterRule.column,
        filterRule.operator,
        filterRule.value
      );
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as T[];
}
