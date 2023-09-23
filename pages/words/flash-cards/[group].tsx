import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { FlashCardGroup, UserFlashCardsContext } from "context";
import { FlashCardGrid } from "features/flashcards";
import { WordMeanings } from "features/words";
import { getDictionaryReponse, parseDictionaryMeanings } from "utils";

/**
 * User can submit a group in order for the backend to contact the dictionary API, and get the results.
 */
export default function FlashCardsGroup() {
  const router = useRouter();

  // if null, name is wrong (e.g. mangled url param)
  const [group, setGroup] = useState<FlashCardGroup | null>();
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  const [meanings, setMeanings] = useState<WordMeanings[]>([]);

  useEffect(() => {
    // TODO error handling
    const fetchMeanings = async () => {
      if (!group) return;

      const dictionaryRequests = group.words.map(getDictionaryReponse);
      // TODO extract to util
      const dictionaryResults = await Promise.all(dictionaryRequests);
      const fetchedMeanings = dictionaryResults.map(parseDictionaryMeanings);

      setMeanings(fetchedMeanings);
    };

    fetchMeanings();
  }, [group]);

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const { group } = router.query;
      setGroup(
        userFlashCardGroups?.find((g) => g.title === (group as string)) || null
      );
    }
  }, [router.query, userFlashCardGroups]);

  useEffect(() => {
    if (group === null) router.push("/words/flash-cards");
  }, [group, router]);

  return group ? <FlashCardGrid group={group} meanings={meanings} /> : null;
}
