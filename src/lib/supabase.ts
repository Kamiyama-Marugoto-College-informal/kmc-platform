import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = "student" | "staff" | "admin";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
}
