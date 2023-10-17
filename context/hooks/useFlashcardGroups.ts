import { useContext } from "react";
import { UserFlashcardsContext } from "context/user-flashcard-groups";

export const useFlashcardGroups = () => {
  const [userFlashcardGroups, setUserFlashcardGroups] = useContext(
    UserFlashcardsContext
  );

  return { userFlashcardGroups, setUserFlashcardGroups };
};
