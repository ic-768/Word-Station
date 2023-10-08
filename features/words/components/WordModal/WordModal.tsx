import { Dispatch, SetStateAction, useState } from "react";
import { useLikeWord, WordMeanings } from "features/words";

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
  const [handleSave, handleDelete, isWordLikeStatusLoading] = useLikeWord(
    word,
    setIsWordSaved
  );

  const pageData = meanings?.[page];

  if (!pageData) return <Skeleton />;

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
        {synonyms.length ? <SynonymsList synonyms={synonyms} /> : null}
      </div>
      <Footer page={page} numPages={meanings.length} setPage={setPage} />
    </div>
  );
};

export default WordModal;
