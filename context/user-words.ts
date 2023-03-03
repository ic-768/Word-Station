import React, { Dispatch, SetStateAction } from "react";

type UserWordsContextArgs = [string[], Dispatch<SetStateAction<string[]>>];

/**
 * Ctx to provide UserWords and setUserWords to subcomponents.
 */
export const UserWordsContext = React.createContext<UserWordsContextArgs>([
  [],
  () => [],
]);
