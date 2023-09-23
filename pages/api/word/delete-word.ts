import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

type Data = {
  word: string;
  meanings: string;
};

const deleteWord = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const data = req.body;
    const { word, id } = data;
    const { error } = await supabase
      .from("words")
      .delete()
      .match({ name: word, user_id: id });
    //TODO handle error

    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

export default deleteWord;
