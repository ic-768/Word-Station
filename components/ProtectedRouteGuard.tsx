import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

import Loader from "./Loader";

function ProtectedRouteGuard({ children }: { children: ReactElement }) {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unprotectedRoutes = ["/", "/login", "/register"];
    (async () => {
      const { data, error } = await supabase.auth.getUser();

      // Redirect away from deeper routes if no user.
      if (data.user === null && !unprotectedRoutes.includes(router.pathname)) {
        router.push("/");
      }
      // Redirect user to words - no need for a logged in user to be able to see the sign in page.
      else if (data.user && unprotectedRoutes.includes(router.pathname)) {
        router.push("/words");
      }
      setUserLoaded(true);
    })();
  }, [router]);

  return userLoaded ? children : <Loader />;
}

export default ProtectedRouteGuard;
