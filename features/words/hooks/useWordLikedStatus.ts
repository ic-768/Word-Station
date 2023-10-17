import { useEffect, useState } from "react";

import { useWords } from "context";
import { useWordCRUD } from "./useWordCrud";

/**
 * Returns utilities and functions related to the 'like' status of a word
 */
export const useWordLikedStatus = (word: string) => {
  const { userWords, setUserWords } = useWords();
  const wordCRUD = useWordCRUD();

  const [isWordLiked, setIsWordLiked] = useState(!!userWords?.includes(word));
  const [isWordLikeStatusLoading, setIsWordLikeStatusLoading] = useState(false);

  // is word already Liked by user?
  useEffect(
    () => setIsWordLiked(!!userWords?.includes(word)),
    [userWords, word]
  );

  const withLoading = async (func: () => Promise<any>) => {
    setIsWordLikeStatusLoading(true);
    await func();
    setIsWordLikeStatusLoading(false);
  };

  const handleLike = () =>
    withLoading(async () => {
      await wordCRUD(
        word,
        "save-word",
        "POST",
        "Word saved successfully!",
        "Word is already saved",
        () => {
          setIsWordLiked(true);
          if (userWords) {
            const updatedWords = userWords?.concat(word);
            setUserWords(updatedWords);
          }
        }
      );
    });

  const handleUnlike = () =>
    withLoading(async () => {
      await wordCRUD(
        word,
        "delete-word",
        "DELETE",
        "Word removed successfully!",
        "Something went wrong",
        () => {
          setIsWordLiked(false);
          if (userWords) {
            const updatedWords = userWords?.filter((w) => w !== word);
            setUserWords(updatedWords);
          }
        }
      );
    });

  return {
    isWordLiked,
    handleLike,
    handleUnlike,
    isWordLikeStatusLoading,
  };
};
