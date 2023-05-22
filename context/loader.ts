import React, { Dispatch, SetStateAction } from "react";
import { LoaderComponentArgs } from "../components/common/Loader/Loader";

// can provide object to specify both visibility and positioning (tailwind class string)
type positionedLoaderArgs = { showLoader: boolean } & LoaderComponentArgs;

// true / false => show with default positioning / hide or use object as stated above
export type LoaderArgs = boolean | positionedLoaderArgs;

type LoaderContextArgs = [LoaderArgs, Dispatch<SetStateAction<LoaderArgs>>];

export const isPositionedLoader = (
  loaderArgs: any
): loaderArgs is LoaderComponentArgs => {
  return loaderArgs.position;
};

/**
 * Ctx to provide isLoading and setIsLoading to subcomponents. Is provided with state in outer app component.
 */
export const LoaderContext = React.createContext<LoaderContextArgs>([
  false,
  () => true,
]);
