import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

type Data = {
  groupName: string;
  word: string;
};

const updateFlashCardGroup = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const body = req.body;
    const { id, groupName, word } = body;

    const { data: existingData } = await supabase
      .from("flash_cards")
      .select("group")
      .eq("user_id", id)
      .eq("name", word)
      .eq("group", groupName);

    if (existingData?.length) {
      res.status(500).send("Word already in group");
    }

    // create flashcard object with group
    const data = await supabase
      .from("flash_cards")
      .insert({ name: word, group: groupName, user_id: id })
      .eq("user_id", id);

    if (data) {
      res.status(200).send("OK");
    } else {
      res.status(500).send("Failed to update record");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

export default updateFlashCardGroup;
