import { supabase } from "lib/supabaseClient";

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw Error(error.message);
};

export { login };
