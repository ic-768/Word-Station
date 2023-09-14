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
  React.createContext<UserFlashCardsContextArgs>([
    [
      { title: "Stephen King", words: ["test", "string", "pillow"] },
      { title: "Test0", words: ["basket", "straw", "pillow"] },
      { title: "Test1", words: ["daisy", "psychology", "donut"] },
      { title: "Test2", words: ["roll", "foe", "test"] },
      { title: "Test3", words: ["blanket", "deter", "fair"] },
      {
        title: "Newspaper",
        words: ["scrub", "literature"],
      },
    ],
    () => [],
  ]);
