import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

type Data = {
  word: string;
  meanings: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  try {
    const word = req.body;

    // Check to see if word already saved by user
    // TODO handle error
    const { count, error } = await supabase
      .from("words")
      .select("name", { head: true, count: "exact" })
      .eq("name", word);

    if (count) {
      res.status(409).send("Word already saved");
    } else {
      // TODO handle error
      const { data, error } = await supabase
        .from("words")
        .insert({ name: word });
      console.log("added");
      res.status(200).send("OK");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
}
