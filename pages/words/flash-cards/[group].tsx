import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import {
  FlashCardGroup,
  UserFlashCardsContext,
} from "../../../context/user-flashcard-groups";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";

/**
 * User can submit a group in order for the backend to contact the dictionary API, and get the results.
 */
export default function GetMeaning() {
  const router = useRouter();

  // if null, name is wrong (e.g. mangled url param)
  const [group, setGroup] = useState<FlashCardGroup | null>();
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  // TODO Correct type
  const [meanings, setMeanings] = useState<string[]>([]);

  useEffect(() => {
    // TODO error handling
    const fetchMeanings = async () => {
      if (!group) return;

      const dictionaryResults = await Promise.all(
        group.words.map(async (w) => await getDictionaryReponse(w))
      );
      const fetchedMeanings = dictionaryResults.map((r) =>
        parseDictionaryMeanings(r)
      );

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

  return group ? (
    <div>
      {group.title}
      <ul>
        {group.words.map((w) => (
          <li key={w + "l"}>{w}</li>
        ))}
      </ul>

      <ul>
        {group.words.map((w) => (
          <li key={w + "l"}>{w}</li>
        ))}
      </ul>
    </div>
  ) : null;
}
