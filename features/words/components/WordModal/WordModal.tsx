import { useState } from "react";

import { useWordFromUrl } from "features/words";
import {
  DefinitionsList,
  SynonymsList,
  LikeWordButton,
  Footer,
  Skeleton,
} from "./components";

const WordModal = () => {
  const { word, wordMeanings } = useWordFromUrl();

  const [page, setPage] = useState(0);

  const pageData = wordMeanings?.[page];
  if (!pageData) return <Skeleton />;

  const { definitions, synonyms } = pageData;

  return (
    <div className="absolute inset-x-0 flex flex-col items-center max-w-sm p-8 mx-auto bg-white rounded top-32 h-4/6 sm:max-w-lg">
      <LikeWordButton word={word} />
      <div className="relative flex flex-col w-full h-full overflow-y-auto text-neutral-800 max-h-max">
        <span className="text-lg font-semibold uppercase">{word}</span>
        <DefinitionsList definitions={definitions} />
        {synonyms.length ? <SynonymsList synonyms={synonyms} /> : null}
      </div>
      <Footer page={page} numPages={wordMeanings.length} setPage={setPage} />
    </div>
  );
};

export default WordModal;
