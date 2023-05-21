import React, { Dispatch, SetStateAction } from "react";

type LoaderContextArgs = [boolean, Dispatch<SetStateAction<boolean>>];

/**
 * Ctx to provide isLoading and setIsLoading to subcomponents. Is provided with state in outer app component.
 */
export const LoaderContext = React.createContext<LoaderContextArgs>([
  false,
  () => true,
]);
