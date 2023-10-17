import React, { Dispatch, SetStateAction } from "react";

export interface FlashcardGroup {
  title: string;
  words: string[];
}

type UserFlashcardsContextArgs = [
  FlashcardGroup[] | null,
  Dispatch<SetStateAction<FlashcardGroup[] | null>>
];

/**
 * Ctx to provide user Flashcard collection.
 */
export const UserFlashcardsContext =
  React.createContext<UserFlashcardsContextArgs>([[], () => []]);
