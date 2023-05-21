import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Loader from "../Loader";

function RouteGuard({ children }: { children: ReactElement }) {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unprotectedRoutes = ["/", "/login", "/register"];
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user === null && !unprotectedRoutes.includes(router.pathname)) {
        router.push("/");
      } else {
        setUserLoaded(true);
      }
    })();
  }, [router]);

  return userLoaded ? children : <Loader />;
}

export default RouteGuard;
