import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AppHeaderLayout } from "layouts";
import {
  WordModal,
  MeaningSearch,
  WordMeanings,
  fetchWordMeanings,
} from "features/words";
import { useNotification } from "context";

export default function WordMeaning() {
  const { setNotification } = useNotification();

  const [word, setWord] = useState("");
  const [wordMeanings, setWordMeanings] = useState<WordMeanings>();

  const router = useRouter();

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

  return (
    <>
      <MeaningSearch />
      <WordModal meanings={wordMeanings} word={word} />
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
