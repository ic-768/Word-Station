import React, { Dispatch, SetStateAction } from "react";

type UserFlashCardsContextArgs = [
  string[][] | null,
  Dispatch<SetStateAction<string[][] | null>>
];

/**
 * Ctx to provide user flashcard collection.
 */
export const UserFlashCardsContext =
  React.createContext<UserFlashCardsContextArgs>([
    [
      ["atest", "string", "pillow"],
      ["scrub", "literature"],
    ],
    () => [],
  ]);
