import {
  ChangeEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { UserWordsContext } from "../../context/user-words";
import InputWithButton from "../../components/common/inputs/InputWithButton";
import FindNewWordButton from "../../components/app/FindNewWordButton";
import Loader from "../../components/common/Loader";
import WordList from "../../components/app/WordList";
import UserStatusLayout from "../../components/layouts/UserStatusLayout";
import { UserSessionContext } from "../../context/user-session";
import Router from "next/router";

export default function Words() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);

  // for filtering words
  const [filter, setFilter] = useState("");
  // null means not fetched yet
  const [filteredWords, setFilteredWords] = useState<string[] | null>(null);

  const [session] = useContext(UserSessionContext);

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

  //undefined means it hasn't been initialised yet
  useEffect(() => {
    if (session === null) {
      Router.push("/");
    }
  }, [session]);

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilter(e.target.value);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen p-8">
      <div className="flex flex-col items-center w-full p-4 my-10 rounded outline outline-2 gap-4 outline-slate-600 bg-slate-800 sm:w-auto sm:flex-row sm:items-end">
        <div className="flex flex-col">
          <label>Filter words</label>
          <InputWithButton
            placeholder="e.g. surreptitious"
            text={filter}
            setText={onChangeFilter}
            id="input"
            icon={faMagnifyingGlass}
          />
        </div>
        <FindNewWordButton />
      </div>
      {filteredWords === null ? <Loader /> : <WordList words={filteredWords} />}
    </div>
  );
}

Words.getLayout = function getLayout(page: ReactElement) {
  return <UserStatusLayout>{page}</UserStatusLayout>;
};
