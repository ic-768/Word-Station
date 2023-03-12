import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { GoBackLayout } from "../../../components/Layouts/GoBack";
import WordModal from "../../../components/WordModal";
import { WordMeanings } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";
import { NotificationContext } from "../../../context/notification";
import { UserWordsContext } from "../../../context/user-words";
import MeaningSearch from "../../../components/MeaningSearch";

export default function WordMeaning() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);
  const [_notification, setNotification] = useContext(NotificationContext);

  const [word, setWord] = useState("");
  const [wordMeanings, setWordMeanings] = useState<WordMeanings>();

  const [isWordSaved, setIsWordSaved] = useState(userWords.includes(word));

  const router = useRouter();

  // set word based on url param
  useEffect(() => {
    if (router.query) {
      (async () => {
        const { word } = router.query;
        setWord(word as string);
        const dictionaryResult = await getDictionaryReponse(word as string);
        const meanings = parseDictionaryMeanings(dictionaryResult);
        setWordMeanings(meanings);
      })();
    }
  }, [router.query]);

  // is word already saved by user?
  useEffect(() => {
    setIsWordSaved(userWords.includes(word));
  }, [userWords, word]);

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
      {wordMeanings && (
        <WordModal
          meanings={wordMeanings}
          word={word}
          isWordSaved={isWordSaved}
          setIsWordSaved={setIsWordSaved}
        />
      )}
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return <GoBackLayout>{page}</GoBackLayout>;
};
