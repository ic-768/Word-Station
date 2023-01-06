import WordModal from "../../../components/WordModal/WordModal";
import { WordData } from "../../../types/WordData";
import { getDictionaryReponse } from "../../../utils/api/getDictionaryResponse";
import { parseDictionaryMeanings } from "../../../utils/api/parseDictionaryMeanings";

interface WordMeaningProps {
  word: string;
  wordData: WordData[];
}

export default function WordMeaning({ word, wordData }: WordMeaningProps) {
  // TODO extract logic for parsing wordData
  return <WordModal meanings={wordData} word={word} />;
}

export const getServerSideProps = async (context: any) => {
  // Fetch data from the server based on the route
  const word = context.params.word;
  const dictionaryResult = await getDictionaryReponse(word);
  const meanings = parseDictionaryMeanings(dictionaryResult);

  return { props: { word, wordData: meanings } };
};
