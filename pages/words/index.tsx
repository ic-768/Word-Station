import { ReactElement } from "react";

import { useWordFilter, WordList, WordSearchPanel } from "features/words";
import { AppHeaderLayout } from "layouts";

export default function Words() {
  const { filter, onChangeFilter, filteredWords } = useWordFilter();

  return (
    <div className="relative flex flex-col items-center w-screen p-8 h-full flex-1">
      <div className="flex my-10 items-center gap-8">
        <WordSearchPanel filter={filter} onChangeFilter={onChangeFilter} />
      </div>
      {filteredWords !== null && <WordList words={filteredWords} />}
    </div>
  );
}

Words.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
