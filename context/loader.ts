import React, { Dispatch, SetStateAction } from "react";

// true / false => show with default positioning / hide
// can provide object to specify positioning (tailwind class string)
export type LoaderArgs = boolean | { showLoader: boolean; position?: string };

type LoaderContextArgs = [LoaderArgs, Dispatch<SetStateAction<LoaderArgs>>];

/**
 * Ctx to provide isLoading and setIsLoading to subcomponents. Is provided with state in outer app component.
 */
export const LoaderContext = React.createContext<LoaderContextArgs>([
  false,
  () => true,
]);
