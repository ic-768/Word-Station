import { ReactElement, useContext, useEffect } from "react";
import GetMeaning from "./index";
import { GoBackLayout } from "../../../components/Layouts/GoBack";
import WordModal from "../../../components/WordModal/WordModal";
import { WordMeanings } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";
import { NotificationContext } from "../../../context/notification";
import { useRouter } from "next/router";

interface WordMeaningProps {
  word: string;
  wordMeanings: WordMeanings;
}

export default function WordMeaning({ word, wordMeanings }: WordMeaningProps) {
  const [_notification, setNotification] = useContext(NotificationContext);
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
      <WordModal meanings={wordMeanings} word={word} />
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
