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
}

export default function WordMeaning({ words, word }: WordMeaningProps) {
  const router = useRouter();
  const [_notification, setNotification] = useContext(NotificationContext);
  const [wordMeanings, setWordMeanings] = useState<WordMeanings>();

  // initialized based on getServerSideProps - can then be updated locally
  const [isWordSaved, setIsWordSaved] = useState(words?.includes(word));

  // set word based on url param
  useEffect(() => {
    if (router.query) {
      (async () => {
        const { word } = router.query;
        const dictionaryResult = await getDictionaryReponse(word as string);
        const meanings = parseDictionaryMeanings(dictionaryResult);
        setWordMeanings(meanings);
      })();
    }
  }, [router.query]);

  // is word already saved by user?
  useEffect(() => {
    setIsWordSaved(words?.includes(word));
  }, [words, word]);

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
      <GetMeaning />
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

export const getServerSideProps = async () => {
  let { data } = await supabase.from("words").select();
  const words = data?.map((d) => d.name);

  return { props: { words } };
};
