import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { UserWordsContext } from "../../context/user-words";
import { WordList } from "../../components/WordList/WordList";
import { WordFilter } from "../../components/WordFilter/WordFilter";
import { FindNewWordButton } from "../../components/FindNewWordButton/FindNewWordButton";

export default function Words() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);

  // for filtering words
  const [filter, setFilter] = useState("");
  const [filteredWords, setFilteredWords] = useState<string[]>();

  // filter
  useEffect(() => {
    setFilteredWords(
      userWords.filter((w) => w.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, userWords]);

  if (!filteredWords) return null;

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilter(e.target.value);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen">
      <div className="flex items-center content-center my-10 gap-4">
        <WordFilter onChangeFilter={onChangeFilter} />
        <FindNewWordButton />
      </div>
      <WordList words={filteredWords} />
    </div>
  );
}
