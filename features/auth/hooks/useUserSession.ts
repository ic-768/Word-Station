import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "lib/supabaseClient";

export const useUserSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const initialiseSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session || null);
    };

    initialiseSession();
  }, []);

  // update auth context whenever session changes
  supabase.auth.onAuthStateChange((_, newSession) => {
    setSession(newSession);
  });

  return { session, setSession };
};
