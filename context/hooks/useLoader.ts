import { useContext } from "react";
import { LoaderContext } from "context/loader";

export const useLoader = () => {
  const [loader, setLoader] = useContext(LoaderContext);

  return { loader, setLoader };
};
