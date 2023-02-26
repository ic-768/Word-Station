import React, { Dispatch, SetStateAction } from "react";

type WordsContextArgs = [
  string[] | undefined,
  Dispatch<SetStateAction<string[] | undefined>>
];

/**
 * Ctx to provide words and setWords to subcomponents.
 */
export const WordsContext = React.createContext<WordsContextArgs>([
  [],
  () => [],
]);
