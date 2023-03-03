import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import GetMeaning from "./index";
import { GoBackLayout } from "../../../components/Layouts/GoBack";
import WordModal from "../../../components/WordModal/WordModal";
import { WordMeanings } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";
import { NotificationContext } from "../../../context/notification";
import { supabase } from "../../../lib/supabaseClient";

interface WordMeaningProps {
  words: string[];
  word: string;
  wordMeanings: WordMeanings;
}

export default function WordMeaning({
  words,
  word,
  wordMeanings,
}: WordMeaningProps) {
  const [_notification, setNotification] = useContext(NotificationContext);

  // initialized based on getServerSideProps - can then be updated locally
  const [isWordSaved, setIsWordSaved] = useState(words?.includes(word));

  useEffect(() => {
    setIsWordSaved(words?.includes(word));
  }, [words, word]);

  const router = useRouter();

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
        isWordSaved={isWordSaved}
        setIsWordSaved={setIsWordSaved}
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

  let { data } = await supabase.from("words").select();
  const words = data?.map((d) => d.name);

  return { props: { words, word, wordMeanings: meanings } };
};
