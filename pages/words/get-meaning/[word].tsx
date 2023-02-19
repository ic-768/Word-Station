import { ReactElement } from "react";
import GetMeaning from ".";
import { GoBackLayout } from "../../../components/Layouts/GoBack";
import WordModal from "../../../components/WordModal/WordModal";
import { WordMeanings } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";

interface WordMeaningProps {
  word: string;
  wordMeanings: WordMeanings;
}

export default function WordMeaning({ word, wordMeanings }: WordMeaningProps) {
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
