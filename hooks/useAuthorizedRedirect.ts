import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "../context/user-session";

/**
 * Redirects user to main app screen if logged-in - used to avoid login and register pages
 */
const useAuthorizedRedirect = (condition = true) => {
  const [session] = useContext(UserSessionContext);

  // Make sure we don't push twice in quick succession (patches 'abort fetching component for route' error )
  const [isPushing, setIsPushing] = useState(false);

  useEffect(() => {
    if (condition && session && !isPushing) {
      Router.push("/words");
      setIsPushing(true);
    }
  }, [session, isPushing, condition]);
};

export default useAuthorizedRedirect;
