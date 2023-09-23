import { getDictionaryReponse, parseDictionaryMeanings } from "utils";

export const fetchWordMeanings = async (word: string) => {
  const dictionaryResult = await getDictionaryReponse(word as string);
  const meanings = parseDictionaryMeanings(dictionaryResult);

  return meanings;
};
