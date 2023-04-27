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
    const data = req.body;
    const { word, id } = data;

    const { error } = await supabase
      .from("words")
      .delete()
      .match({ name: word, user_id: id });
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
}
