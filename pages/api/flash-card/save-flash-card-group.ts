import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

type Data = {
  groupName: string;
  word: string;
};

const saveFlashCardGroup = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const data = req.body;
    const { id, groupName, word } = data;

    // Check to see if word already saved by user
    // TODO handle error
    const { count, error } = await supabase
      .from("flash_cards")
      .select("name", { head: true, count: "exact" })
      .eq("name", word)
      .eq("user_id", id)
      .eq("group", groupName);
    if (count) {
      res.status(409).send("Word already in group");
    } else {
      // TODO handle error
      const { data, error } = await supabase
        .from("flash_cards")
        .insert({ name: word, user_id: id, group: groupName });
      res.status(200).send("OK");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

export default saveFlashCardGroup;
