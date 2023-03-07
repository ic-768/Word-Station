import { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { WordMeanings } from "../../types/WordData";
import { PageButtons } from "./PageButtons";
import { PageCounter } from "./PageCounter";
import { DefinitionsList } from "./DefinitionsList";
import { SynonymsList } from "./SynonymsList";
import { useWordCRUD } from "./hooks";

interface WordModalProps {
  meanings: WordMeanings;
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
  const wordCRUD = useWordCRUD();
  const pageData = meanings[page];

  if (!pageData) return null;

  const handleSave = async () =>
    await wordCRUD(
      word,
      "save-word",
      "POST",
      "Word saved successfully!",
      "Word is already saved",
      () => setIsWordSaved(true)
    );

  const handleDelete = async () =>
    await wordCRUD(
      word,
      "delete-word",
      "DELETE",
      "Word removed successfully!",
      "Something went wrong",
      () => setIsWordSaved(false)
    );

  return (
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 drop-shadow-md">
      <div className="relative flex flex-col text-gray-500">
        <FontAwesomeIcon
          fontSize={24}
          cursor="pointer"
          onClick={isWordSaved ? handleDelete : handleSave}
          icon={isWordSaved ? solidHeart : emptyHeart}
        />

        <span className="text-xl font-semibold capitalize">{word}</span>
        <DefinitionsList pageData={pageData} />
        <SynonymsList pageData={pageData} />

        <PageButtons page={page} numPages={meanings.length} setPage={setPage} />
        <PageCounter page={page} numPages={meanings.length} />
      </div>
    </div>
  );
};

export default WordModal;
