import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../lib/supabaseClient";

interface WordsProps {
  wordData: { id: number; name: string }[];
}

export default function Words({ wordData }: WordsProps) {
  const words = useMemo(() => wordData.map((d) => d.name).sort(), [wordData]);

  const [filter, setFilter] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    setFilteredWords(
      words.filter((w) => w.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [words, filter]);

  const onChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilter(e.target.value);

  return (
    <div className="h-screen w-screen flex flex-col items-center relative">
      <div className="flex items-center content-center gap-4 my-10">
        <div className="flex flex-col width-max">
          <label>Filter words</label>
          <div className="flex items-center gap-1 bg-white rounded-md focus-within:ring focus-within:ring-indigo-500 ">
            <input
              onChange={onChangeFilter}
              className="focus:outline-none transition-shadow py-2 px-4 leading-5 appearance-none bg-transparent text-black"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-black mx-2"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Add new word</label>
          <Link
            className="text-neutral-900 text-4xl hover:text-blue-600 transition-colors"
            href="words/get-meaning"
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </Link>
        </div>
      </div>
      <section className="h-screen w-screen p-8 overflow-x-auto h-4/5">
        <div className="grid justify-center grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
          {filteredWords.map((w) => (
            <div
              key={w}
              className="flex flex-col items-center content-center bg-white rounded-lg border shadow-md "
            >
              <Link
                href={`words/get-meaning/${w}`}
                className="p-3 text-neutral-900 text-center pointer hover:text-blue-600 w-full"
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

export async function getStaticProps() {
  let { data } = await supabase.from("words").select();

  return {
    props: {
      wordData: data,
    },
  };
}
