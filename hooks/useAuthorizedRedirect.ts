import Router from "next/router";
import { useContext, useEffect } from "react";
import { UserSessionContext } from "../context/user-session";

/**
 * Redirects user to main app screen if logged-in - used to avoid login and register pages
 */
const useAuthorizedRedirect = () => {
  const [session] = useContext(UserSessionContext);

  useEffect(() => {
    if (session) {
      Router.push("/words");
    }
  }, [session]);
};

export default useAuthorizedRedirect;
