import { useEffect, useState } from "react";
import { FlashCardGroup } from "context";
import { getUserFlashCards, parseFlashCardGroups } from "features/flashcards";

export const useFetchUserFlashCardGroups = (id?: string) => {
  const [userFlashCardGroups, setUserFlashCardGroups] = useState<
    FlashCardGroup[] | null
  >([]);

  // fetch user's flashcards
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await getUserFlashCards(id);
        const { data } = response;
        if (data) {
          const parsedflashCards = parseFlashCardGroups(data);
          setUserFlashCardGroups(parsedflashCards);
        } else {
          // TODO handle error
        }
      }
    })();
  }, [id]);

  return {
    userFlashCardGroups,
    setUserFlashCardGroups,
  };
};
