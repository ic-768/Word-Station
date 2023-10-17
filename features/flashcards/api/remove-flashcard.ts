import { supabase } from "lib/supabaseClient";

export const removeFlashCardGroup = async (word: string, groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flash-card/remove-flash-card-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupName, id, word }),
  });
  console.log(response);
};
