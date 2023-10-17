import { useUserSession } from "features/auth";
import { getUserWords } from "features/words";
import { useEffect, useState } from "react";

export const useFetchUserWords = () => {
  // list of user-saved words - null means not fetched yet
  const [userWords, setUserWords] = useState<string[] | null>(null);
  const { session } = useUserSession();
  const id = session?.user.id;

  // fetch user's words and alphabetize
  useEffect(() => {
    if (id) {
      (async () => {
        const response = await getUserWords(id);
        const { data } = response;
        if (data) {
          const sortedWords = data.map((d) => d.name).sort();
          // update user words context
          setUserWords(sortedWords);
        } else {
          // TODO set error
        }
      })();
    }
  }, [id]);

  return { userWords, setUserWords };
};
