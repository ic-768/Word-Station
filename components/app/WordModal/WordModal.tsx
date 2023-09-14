import { Dispatch, SetStateAction, useContext, useState } from "react";
import { LoaderContext } from "../../../context/loader";
import { UserWordsContext } from "../../../context/user-words";
import { useWordCRUD } from "../../../hooks";
import { WordMeanings } from "../../../types/WordData";

import {
  DefinitionsList,
  SynonymsList,
  LikeWordButton,
  Footer,
  Skeleton,
} from "./components";

interface WordModalProps {
  meanings?: WordMeanings;
  word: string;
  isWordSaved?: boolean;
  setIsWordSaved: Dispatch<SetStateAction<boolean>>;
}

const WordModal = ({
  meanings,
  word,
  isWordSaved,
  setIsWordSaved,
}: WordModalProps) => {
  const [page, setPage] = useState(0);
  const [isWordLikeStatusLoading, setIsWordLikeStatusLoading] = useState(false);
  const wordCRUD = useWordCRUD();
  const pageData = meanings?.[page];
  const [userWords, setUserWords] = useContext(UserWordsContext);
  const [_loader, setLoader] = useContext(LoaderContext);

  if (!pageData) return <Skeleton />;

  const handleSave = async () => {
    setIsWordLikeStatusLoading(true);
    await wordCRUD(
      word,
      "save-word",
      "POST",
      "Word saved successfully!",
      "Word is already saved",
      () => {
        setIsWordSaved(true);
        if (userWords) {
          const updatedWords = userWords?.concat(word);
          setUserWords(updatedWords);
        }
      }
    );
    setIsWordLikeStatusLoading(false);
  };

  const handleDelete = async () => {
    setIsWordLikeStatusLoading(true);
    await wordCRUD(
      word,
      "delete-word",
      "DELETE",
      "Word removed successfully!",
      "Something went wrong",
      () => {
        setIsWordSaved(false);
        if (userWords) {
          const updatedWords = userWords?.filter((w) => w !== word);
          setUserWords(updatedWords);
        }
      }
    );
    setIsWordLikeStatusLoading(false);
  };

  const { definitions, synonyms } = pageData;

  return (
    <div className="absolute inset-x-0 flex flex-col items-center max-w-sm p-8 mx-auto bg-white rounded top-32 h-4/6 sm:max-w-lg">
      <LikeWordButton
        isLoading={isWordLikeStatusLoading}
        isWordSaved={isWordSaved}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
      <div className="relative flex flex-col w-full h-full overflow-y-auto text-neutral-800 max-h-max">
        <span className="text-lg font-semibold uppercase">{word}</span>
        <DefinitionsList definitions={definitions} />
        {synonyms.length && <SynonymsList synonyms={synonyms} />}
      </div>
      <Footer page={page} numPages={meanings.length} setPage={setPage} />
    </div>
  );
};

export default WordModal;
