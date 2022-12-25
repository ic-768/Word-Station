import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  word: string;
  meanings: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const word = req.body;
  const dictionaryResponse = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const dictionaryResult = await dictionaryResponse.json();
  try {
    const [results] = dictionaryResult;
    const { meanings } = results;
    res.status(200).json({ word, meanings });
  } catch {
    res.status(404).send("Couldn't get word");
  }
}
