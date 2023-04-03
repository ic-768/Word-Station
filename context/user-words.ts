import React, { Dispatch, SetStateAction } from "react";

type UserWordsContextArgs = [
  string[] | null,
  Dispatch<SetStateAction<string[] | null>>
];

/**
 * Ctx to provide UserWords and setUserWords to subcomponents.
 */
export const UserWordsContext = React.createContext<UserWordsContextArgs>([
  [],
  () => [],
]);
