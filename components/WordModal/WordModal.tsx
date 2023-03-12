import { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { WordMeanings } from "../../types/WordData";
import { useWordCRUD } from "../../hooks";
import {
  DefinitionsList,
  SynonymsList,
  PageButtons,
  PageCounter,
} from "./components";

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

  const [onClick, icon] = isWordSaved
    ? [handleDelete, solidHeart]
    : [handleSave, emptyHeart];

  return (
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 h-4/6">
      <div className="relative flex flex-col h-full overflow-y-auto text-neutral-800 max-h-max">
        <FontAwesomeIcon
          fontSize={24}
          cursor="pointer"
          onClick={onClick}
          icon={icon}
        />

        <span className="text-xl font-semibold capitalize">{word}</span>
        <DefinitionsList pageData={pageData} />
        <SynonymsList pageData={pageData} />

        {/*TODO this is a footer*/}
        <div className="sticky bottom-0 pt-4 mt-auto bg-white">
          <PageButtons
            page={page}
            numPages={meanings.length}
            setPage={setPage}
          />
          <PageCounter page={page} numPages={meanings.length} />
        </div>
      </div>
    </div>
  );
};

export default WordModal;
