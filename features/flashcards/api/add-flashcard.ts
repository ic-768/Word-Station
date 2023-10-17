import { supabase } from "lib/supabaseClient";

export const addFlashcardGroup = async (groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flashcard/add-flashcard-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupName, id }),
  });
  console.log(response);
};
