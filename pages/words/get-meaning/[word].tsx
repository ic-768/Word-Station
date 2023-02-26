import { ReactElement, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import GetMeaning from "./index";
import { GoBackLayout } from "../../../components/Layouts/GoBack";
import WordModal from "../../../components/WordModal/WordModal";
import { WordMeanings } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";
import { NotificationContext } from "../../../context/notification";
import { WordsContext } from "../../../context/words";

interface WordMeaningProps {
  word: string;
  wordMeanings: WordMeanings;
}

export default function WordMeaning({ word, wordMeanings }: WordMeaningProps) {
  const [_notification, setNotification] = useContext(NotificationContext);
  const [words, setWords] = useContext(WordsContext);
  const router = useRouter();

  // if words in context not set, get words from localStorage
  // TODO extract to hook
  useEffect(() => {
    if (!words) {
      const locallySavedWords = localStorage.getItem("words");
      if (locallySavedWords) {
        const wordArray = JSON.parse(locallySavedWords);
        setWords(wordArray);
      }
    }
  }, [words, setWords]);

  const isWordSaved = words?.includes(word);

  useEffect(() => {
    if (wordMeanings.error) {
      setNotification({
        type: "error",
        message: "Couldn't find that word!",
      });

      router.push("/words/get-meaning");
    }
  }, [wordMeanings, setNotification, router]);

  return (
    <>
      <GetMeaning />
      <WordModal
        meanings={wordMeanings}
        word={word}
        words={words}
        setWords={setWords}
        isWordSaved={isWordSaved}
      />
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return <GoBackLayout>{page}</GoBackLayout>;
};

export const getServerSideProps = async (context: any) => {
  // Fetch data from the server based on the route
  const word = context.params.word;
  const dictionaryResult = await getDictionaryReponse(word);
  const meanings = parseDictionaryMeanings(dictionaryResult);

  return { props: { word, wordMeanings: meanings } };
};
