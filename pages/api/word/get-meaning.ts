import type { NextApiRequest, NextApiResponse } from "next";
import { getDictionaryReponse, parseDictionaryMeanings } from "utils";

type Data = {
  word: string;
  meanings: string;
};

export const getMeaning = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const word = req.body;
    const dictionaryResult = await getDictionaryReponse(word);
    const meanings = parseDictionaryMeanings(dictionaryResult);

    res.status(200).json({ word, meanings });
  } catch {
    res.status(404).send("Couldn't get word");
  }
};
