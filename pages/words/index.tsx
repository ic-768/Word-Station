import { ChangeEventHandler, ReactElement, useEffect, useState } from "react";

import { useLoader, useWords } from "context";
import { WordList, WordSearchPanel } from "features/words";
import { AppHeaderLayout } from "layouts";

export default function Words() {
  const { userWords } = useWords();

  // for filtering words
  const [filter, setFilter] = useState("");
  // null means not fetched yet
  const [filteredWords, setFilteredWords] = useState<string[] | null>(null);

  const { setLoader } = useLoader();

  useEffect(() => setLoader(true), [setLoader]);

  // filter
  useEffect(() => {
    if (userWords) {
      setFilteredWords(
        userWords.filter((w) => w.toLowerCase().includes(filter.toLowerCase()))
      );
      setLoader(false);
    }
  }, [filter, userWords, setLoader]);

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilter(e.target.value);

  return (
    <div className="relative flex flex-col items-center w-screen p-8">
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
