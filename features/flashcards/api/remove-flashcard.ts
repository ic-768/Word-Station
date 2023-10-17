import { supabase } from "lib/supabaseClient";

export const removeFlashcardGroup = async (word: string, groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flashcard/remove-flashcard-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupName, id, word }),
  });
  console.log(response);
};
