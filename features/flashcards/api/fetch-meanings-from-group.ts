import { FlashcardGroup } from "context";
import { getDictionaryReponse, parseDictionaryMeanings } from "features/words";

export const fetchMeaningsFromGroup = async (group: FlashcardGroup) => {
  const dictionaryRequests = group.words.map(getDictionaryReponse);
  const dictionaryResults = await Promise.all(dictionaryRequests);
  const fetchedMeanings = dictionaryResults.map(parseDictionaryMeanings);

  return fetchedMeanings;
};
