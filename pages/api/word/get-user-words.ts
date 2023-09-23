import { supabase } from "lib/supabaseClient";

const getUserWords = async (id: string) => {
  return await supabase.from("words").select().match({ user_id: id });
};

export default getUserWords;
