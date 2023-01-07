import { ChangeEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
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
      <input
        onChange={onChangeFilter}
        className="absolute top-8 rounded-md focus:outline-none focus:outline-none focus:ring focus:ring-indigo-500 py-2 px-4 leading-5 appearance-none"
      />
      <div className="flex flex-col mt-20">
        <div className="flex flex-wrap p-8 gap-2">
          {filteredWords.map((w) => (
            <Link
              href={`/words/get-meaning/${w}`}
              className="bg-white rounded-lg shadow-lg p-6"
              key={w}
            >
              <span className="text-gray-700 mb-4">{w}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/words/get-meaning"
          className="self-center text-6xl hover:text-blue-600 transition-colors"
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
      </div>
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
