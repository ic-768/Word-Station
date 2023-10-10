import React, { Dispatch, SetStateAction } from "react";

export interface FlashCardGroup {
  title: string;
  words: string[];
}

type UserFlashCardsContextArgs = [
  FlashCardGroup[] | null,
  Dispatch<SetStateAction<FlashCardGroup[] | null>>
];

/**
 * Ctx to provide user flashcard collection.
 */
export const UserFlashCardsContext =
  React.createContext<UserFlashCardsContextArgs>([[], () => []]);
