import { useContext } from "react";
import { UserFlashCardsContext } from "context/user-flashcard-groups";

export const useFlashCardGroups = () => {
  const [userFlashCardGroups, setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  return { userFlashCardGroups, setUserFlashCardGroups };
};
