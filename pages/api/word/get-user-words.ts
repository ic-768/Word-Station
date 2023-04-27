import { supabase } from "../../../lib/supabaseClient";

export const getUserWords = async (id: string) => {
  return await supabase.from("words").select().match({ user_id: id });
};
