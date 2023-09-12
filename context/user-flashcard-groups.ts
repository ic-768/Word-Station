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
      { title: "Stephen King", words: ["atest", "string", "pillow"] },
      { title: "Stephen King", words: ["atest", "string", "pillow"] },
      { title: "Stephen King", words: ["atest", "string", "pillow"] },
      { title: "Stephen King", words: ["atest", "string", "pillow"] },
      { title: "Stephen King", words: ["atest", "string", "pillow"] },
      {
        title: "Newspaper",
        words: [
          "scrub",
          "literature",
          "test1",
          "test2",
          "test3",
          "test4",
          "test5",
        ],
      },
    ],
    () => [],
  ]);
