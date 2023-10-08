import { UserWordsContext } from "context";
import { Dispatch, SetStateAction, useContext, useState } from "react";

import { useWordCRUD } from "./useWordCrud";

/**
 * Returns functions to add/remove a word as a favorite, and the request loading status
 */
export const useLikeWord = (
  word: string,
  setIsWordSaved: Dispatch<SetStateAction<boolean>>
) => {
  const [userWords, setUserWords] = useContext(UserWordsContext);
  const [isWordLikeStatusLoading, setIsWordLikeStatusLoading] = useState(false);

  const wordCRUD = useWordCRUD();

  const withLoading = async (func: () => Promise<any>) => {
    setIsWordLikeStatusLoading(true);
    await func();
    setIsWordLikeStatusLoading(false);
  };

  const handleSave = () =>
    withLoading(async () => {
      await wordCRUD(
        word,
        "save-word",
        "POST",
        "Word saved successfully!",
        "Word is already saved",
        () => {
          setIsWordSaved(true);
          if (userWords) {
            const updatedWords = userWords?.concat(word);
            setUserWords(updatedWords);
          }
        }
      );
    });

  const handleDelete = () =>
    withLoading(async () => {
      await wordCRUD(
        word,
        "delete-word",
        "DELETE",
        "Word removed successfully!",
        "Something went wrong",
        () => {
          setIsWordSaved(false);
          if (userWords) {
            const updatedWords = userWords?.filter((w) => w !== word);
            setUserWords(updatedWords);
          }
        }
      );
    });

  return [handleSave, handleDelete, isWordLikeStatusLoading] as const;
};
