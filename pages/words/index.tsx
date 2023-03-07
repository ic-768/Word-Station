import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { UserWordsContext } from "../../context/user-words";

export default function Words() {
  // list of user-saved words
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
        <div className="flex flex-col width-max">
          <label>Filter words</label>
          <div className="flex items-center bg-white gap-1 rounded-md focus-within:ring focus-within:ring-indigo-500">
            <input
              onChange={onChangeFilter}
              className="px-4 py-2 text-black bg-transparent appearance-none focus:outline-none transition-shadow leading-5"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="mx-2 text-black"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Add new word</label>
          <Link
            className="text-4xl text-neutral-900 hover:text-blue-600 transition-colors"
            href="words/get-meaning"
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </Link>
        </div>
      </div>
      <section className="w-screen p-8 overflow-x-auto h-4/5">
        <div className="justify-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
          {filteredWords.map((w) => (
            <div
              key={w}
              className="flex flex-col items-center content-center bg-white border rounded-lg shadow-md"
            >
              <Link
                href={`words/get-meaning/${w}`}
                className="w-full p-3 text-center text-neutral-900 pointer hover:text-blue-600"
              >
                {w}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
