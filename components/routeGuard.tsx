import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function RouteGuard({ children }: { children: ReactElement }) {
  const router = useRouter();

  useEffect(() => {
    const unprotectedRoutes = ["/", "/login", "/signup"];
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user === null && !unprotectedRoutes.includes(router.pathname)) {
        router.push("/");
      }
    })();
  }, [router]);

  return children;
}

export default RouteGuard;
