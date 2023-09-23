import { supabase } from "lib/supabaseClient";

export const getUserWords = async (id: string) =>
  await supabase.from("words").select().match({ user_id: id });
