import { supabase } from "lib/supabaseClient";

export const addFlashCardGroup = async (groupName: string) => {
  const user = await supabase.auth.getUser();
  const id = user.data?.user?.id;

  const response = await fetch("/api/flash-card/add-flash-card-group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupName, id }),
  });
  console.log(response);
};
