import type { NextApiRequest, NextApiResponse } from "next";
import { getDictionaryReponse, parseDictionaryMeanings } from "features/words";

type Data = {
  word: string;
  meanings: string;
};

const getMeaning = async (
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

export default getMeaning;
