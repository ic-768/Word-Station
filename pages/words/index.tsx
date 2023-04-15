import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { UserWordsContext } from "../../context/user-words";
import WordList from "../../components/WordList";
import WordFilter from "../../components/WordFilter";
import FindNewWordButton from "../../components/FindNewWordButton";
import Loader from "../../components/Loader";

export default function Words() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);

  // for filtering words
  const [filter, setFilter] = useState("");
  // null means not fetched yet
  const [filteredWords, setFilteredWords] = useState<string[] | null>(null);

  // filter
  useEffect(() => {
    if (userWords) {
      setFilteredWords(
        userWords.filter((w) => w.toLowerCase().includes(filter.toLowerCase()))
      );
    } else {
      setFilteredWords(null);
    }
  }, [filter, userWords]);

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilter(e.target.value);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen p-8">
      <div className="flex flex-col items-end w-full p-4 my-10 rounded outline outline-2 gap-4 outline-slate-600 bg-slate-800 sm:w-auto sm:flex-row sm:items-center">
        <WordFilter onChangeFilter={onChangeFilter} />
        <FindNewWordButton />
      </div>
      {filteredWords === null ? <Loader /> : <WordList words={filteredWords} />}
    </div>
  );
}
