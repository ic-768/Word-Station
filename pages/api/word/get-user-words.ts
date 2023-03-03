import { supabase } from "../../../lib/supabaseClient";

export type wordData = { id: number; name: string }[];

export const getUserWords = async () => {
  return await supabase.from("words").select();
};
