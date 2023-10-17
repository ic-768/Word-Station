import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

const deleteFlashcard = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  try {
    const body = req.body;
    const { id, groupName, word } = body;

    // Check if the flashcard exists for the given user ID, group name, and word
    const { data: existingData } = await supabase
      .from("flash_cards")
      .select("*")
      .eq("user_id", id)
      .eq("name", word)
      .eq("group", groupName)
      .single();

    if (!existingData) {
      res.status(404).send("Flashcard not found");
      return;
    }

    // Delete the flashcard
    const { error } = await supabase
      .from("flash_cards")
      .delete()
      .eq("user_id", id)
      .eq("name", word)
      .eq("group", groupName);

    if (!error) {
      res.status(200).send("Flashcard deleted successfully");
    } else {
      res.status(500).send("Failed to delete Flashcard");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};

export default deleteFlashcard;
