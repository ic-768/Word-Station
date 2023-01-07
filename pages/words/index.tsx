import { ChangeEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import fsPromises from "fs/promises";
import path from "path";

export default function Words({ words }: { words: string[] }) {
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
      <div className="flex items-center content-center absolute top-10 gap-4">
        <input
          onChange={onChangeFilter}
          className="rounded-md focus:outline-none transition-shadow focus:outline-none focus:ring focus:ring-indigo-500 py-2 px-4 leading-5 appearance-none"
        />

        <Link
          className="text-neutral-900 text-4xl hover:text-blue-600 transition-colors"
          href="words/get-meaning"
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </Link>
      </div>
      <section className="h-screen w-screen p-8 pt-20">
        <div className="grid justify-center grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7 my-10">
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
  const filePath = path.join(process.cwd(), "public/mock-data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const words = JSON.parse(jsonData.toString());

  return {
    props: words,
  };
}
