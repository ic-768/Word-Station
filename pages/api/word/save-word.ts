import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import path from "path";

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
    // Read the JSON file
    const filePath = path.join(process.cwd(), "public/mock-data.json");
    const data = await fs.readFile(filePath);
    const wordArray: [string] = JSON.parse(data.toString()).words;

    if (wordArray.includes(word)) {
      res.status(409).send("Word already saved");
    } else {
      const updatedArray = wordArray.concat(word);
      await fs.writeFile(filePath, JSON.stringify({ words: updatedArray }));
      res.status(200).send("OK");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
}
