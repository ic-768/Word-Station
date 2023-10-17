import { supabase } from "lib/supabaseClient";

export const updateFlashCard = async (word: string, groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flashcards/update-flashcard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, groupName, id }),
  });
};
