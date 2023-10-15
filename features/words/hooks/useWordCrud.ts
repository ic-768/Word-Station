import { supabase } from "lib/supabaseClient";

import { useNotification } from "context";

/**
 * Hook that calls a word CRUD endpoint and handles setting notifications based on the outcome
 */
export const useWordCRUD = () => {
  const { setNotification } = useNotification();

  return async (
    word: string,
    route: string,
    method: string,
    successMessage: string,
    errorMessage: string,
    successCallback: () => void
  ) => {
    try {
      const user = await supabase.auth.getUser();
      const id = user.data?.user?.id;

      const response = await fetch(`/api/word/${route}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, id }),
      });
      if (response.ok) {
        setNotification({
          type: "success",
          message: successMessage,
        });
        successCallback();
      } else {
        setNotification({
          type: "error",
          message: errorMessage,
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };
};
