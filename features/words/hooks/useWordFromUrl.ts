import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useNotification } from "context";
import { fetchWordMeanings } from "../api";
import { WordMeanings } from "../types";

export const useWordFromUrl = () => {
  const router = useRouter();
  const [word, setWord] = useState("");
  const { setNotification } = useNotification();

  const [wordMeanings, setWordMeanings] = useState<WordMeanings>();

  // set word based on url param
  useEffect(() => {
    if (!router.query) return;

    (async () => {
      const { word } = router.query;
      setWord(word as string);
      const meanings = await fetchWordMeanings(word as string);
      setWordMeanings(meanings);
    })();
  }, [router.query]);

  // if word couldn't be found, redirect back
  useEffect(() => {
    if (wordMeanings?.error) {
      setNotification({
        type: "error",
        message: "Couldn't find that word!",
      });

      router.push("/words/get-meaning");
    }
  }, [wordMeanings, setNotification, router]);

  return { word, wordMeanings };
};
