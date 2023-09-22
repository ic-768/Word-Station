import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { parseDictionaryMeanings, getDictionaryReponse } from "utils";
import { NotificationContext, UserWordsContext } from "context";
import { WordModal, MeaningSearch, WordMeanings } from "features/words";
import { GoBackLayout, UserStatusLayout } from "layouts";

export default function WordMeaning() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);
  const [_notification, setNotification] = useContext(NotificationContext);

  const [word, setWord] = useState("");
  const [wordMeanings, setWordMeanings] = useState<WordMeanings>();

  const [isWordSaved, setIsWordSaved] = useState(!!userWords?.includes(word));

  const router = useRouter();

  // set word based on url param
  useEffect(() => {
    if (!router.query) return;

    (async () => {
      const { word } = router.query;
      setWord(word as string);
      const dictionaryResult = await getDictionaryReponse(word as string);
      const meanings = parseDictionaryMeanings(dictionaryResult);
      setWordMeanings(meanings);
    })();
  }, [router.query]);

  // is word already saved by user?
  useEffect(
    () => setIsWordSaved(!!userWords?.includes(word)),
    [userWords, word]
  );

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
      <WordModal
        meanings={wordMeanings}
        word={word}
        isWordSaved={isWordSaved}
        setIsWordSaved={setIsWordSaved}
      />
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserStatusLayout>
      <GoBackLayout>{page}</GoBackLayout>
    </UserStatusLayout>
  );
};
