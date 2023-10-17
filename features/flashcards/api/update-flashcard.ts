import { supabase } from "lib/supabaseClient";

export const updateFlashCard = async (word: string, groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flash-card/update-flash-card-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, groupName, id }),
  });
};
