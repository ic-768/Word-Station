import { supabase } from "lib/supabaseClient";

export const getUserFlashcards = async (id: string) =>
  await supabase.from("flash_cards").select().match({ user_id: id });
