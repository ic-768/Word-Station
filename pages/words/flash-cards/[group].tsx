import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import {
  FlashCardGroup,
  UserFlashCardsContext,
} from "../../../context/user-flashcard-groups";

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

  // TODO retrieve and store meanings for each word
  const [meanings, setMeanings] = [];

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
