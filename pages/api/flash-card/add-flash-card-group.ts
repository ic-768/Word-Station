import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

type Data = {
  groupName: string;
  word: string;
};

const createFlashCard = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const data = req.body;
    const { groupName, id } = data;

    // Check if the word already exists for the user and group
    const { count, error } = await supabase
      .from("flash_cards")
      .select("*")
      .eq("group", groupName)
      .eq("user_id", id)
      .single();

    if (count) {
      res.status(409).send("Flashcard already exists for this group and user.");
    } else {
      // Create a new flashcard record
      const { data, error } = await supabase
        .from("flash_cards")
        .insert([{ name: "", group: groupName, user_id: id }]);

      if (!error) {
        res.status(200).send("OK");
      } else {
        res.status(500).send("Failed to create new flashcard.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};

export default createFlashCard;
