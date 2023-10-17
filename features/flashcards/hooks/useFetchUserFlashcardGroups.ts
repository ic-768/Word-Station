import { useEffect, useState } from "react";
import { FlashcardGroup } from "context";

import { getUserFlashcards, parseFlashcardGroups } from "features/flashcards";
import { useUserSession } from "features/auth";

export const useFetchUserFlashcardGroups = () => {
  const [userFlashcardGroups, setUserFlashcardGroups] = useState<
    FlashcardGroup[] | null
  >([]);

  const { session } = useUserSession();
  const id = session?.user.id;

  // fetch user's Flashcards
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await getUserFlashcards(id);
        const { data } = response;
        if (data) {
          const parsedFlashcards = parseFlashcardGroups(data);
          setUserFlashcardGroups(parsedFlashcards);
        } else {
          // TODO handle error
        }
      }
    })();
  }, [id]);

  return {
    userFlashcardGroups,
    setUserFlashcardGroups,
  };
};
