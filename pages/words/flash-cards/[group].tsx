import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import {
  FlashCardGroup,
  UserFlashCardsContext,
} from "../../../context/user-flashcard-groups";
import { WordMeanings } from "../../../types/WordData";
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

  const [meanings, setMeanings] = useState<WordMeanings[]>([]);

  useEffect(() => {
    // TODO error handling
    const fetchMeanings = async () => {
      if (!group) return;

      const dictionaryRequests = group.words.map(getDictionaryReponse);
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

  // TODO grid layout
  return group ? (
    <div className="flex flex-col">
      {group.title}
      <div className="flex">
        <ul className="flex flex-col">
          {group.words.map((w) => (
            <li key={w + "l"}>{w}</li>
          ))}
        </ul>

        <ul className="flex flex-col">
          {meanings.map((m, i) => (
            <li key={i + "r"}>{m[0].definitions[0].definition}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}
