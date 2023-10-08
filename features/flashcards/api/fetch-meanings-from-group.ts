import { FlashCardGroup } from "context";
import { getDictionaryReponse, parseDictionaryMeanings } from "features/words";

export const fetchMeaningsFromGroup = async (group: FlashCardGroup) => {
  const dictionaryRequests = group.words.map(getDictionaryReponse);
  const dictionaryResults = await Promise.all(dictionaryRequests);
  const fetchedMeanings = dictionaryResults.map(parseDictionaryMeanings);

  return fetchedMeanings;
};
