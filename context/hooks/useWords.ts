import { UserWordsContext } from "context/user-words";
import { useContext } from "react";

export const useWords = () => {
  const [userWords, setUserWords] = useContext(UserWordsContext);

  return { userWords, setUserWords };
};
