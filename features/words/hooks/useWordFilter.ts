import { ChangeEventHandler, useEffect, useState } from "react";

import { useLoader, useWords } from "context";

export const useWordFilter = () => {
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

  return { filter, onChangeFilter, filteredWords };
};
