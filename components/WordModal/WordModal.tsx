import { Dispatch, SetStateAction, useState } from "react";

import { WordMeanings } from "../../types/WordData";
import { useWordCRUD } from "../../hooks";
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
  const wordCRUD = useWordCRUD();
  const pageData = meanings?.[page];

  if (!pageData) return <Skeleton />;

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
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 h-4/6">
      <div className="relative flex flex-col h-full overflow-y-auto text-neutral-800 max-h-max">
        <LikeWordButton
          isWordSaved={isWordSaved}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />

        <span className="text-lg font-semibold uppercase">{word}</span>
        <DefinitionsList pageData={pageData} />
        <SynonymsList pageData={pageData} />

        <Footer page={page} numPages={meanings.length} setPage={setPage} />
      </div>
    </div>
  );
};

export default WordModal;
