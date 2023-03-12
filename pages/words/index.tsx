import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { UserWordsContext } from "../../context/user-words";
import WordList from "../../components/WordList";
import WordFilter from "../../components/WordFilter";
import FindNewWordButton from "../../components/FindNewWordButton";

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
      <div className="flex items-end p-4 my-10 rounded outline outline-2 gap-4 outline-slate-600">
        <WordFilter onChangeFilter={onChangeFilter} />
        <FindNewWordButton />
      </div>
      <WordList words={filteredWords} />
    </div>
  );
}
