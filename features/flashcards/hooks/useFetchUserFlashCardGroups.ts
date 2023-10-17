import { useEffect, useState } from "react";
import { FlashCardGroup } from "context";
import { getUserFlashCards, parseFlashCardGroups } from "features/flashcards";
import { useUserSession } from "features/auth";

export const useFetchUserFlashCardGroups = () => {
  const [userFlashCardGroups, setUserFlashCardGroups] = useState<
    FlashCardGroup[] | null
  >([]);

  const { session } = useUserSession();
  const id = session?.user.id;

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
