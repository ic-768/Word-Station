import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
export default function MeaningSearch() {
  const [word, setWord] = useState("");
  const router = useRouter();

  const onTypeWord: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWord(e.target?.value);

  const onChooseWord: FormEventHandler = (e) => {
    e.preventDefault();
    router.push(`/words/get-meaning/${word}`);
  };

  return (
    <>
      <form onSubmit={onChooseWord} className="max-w-lg mx-auto mt-12">
        <label
          className="block mb-2 text-sm font-bold text-gray-700 uppercase"
          htmlFor="input"
        >
          Search for a word
        </label>
        <div className="relative flex items-center content-center">
          <input
            placeholder="e.g. surreptitious"
            className="w-full px-3 py-1.5 bg-white border border-solid border-gray-300 text-gray-500
                       rounded transition-colors
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="input"
            type="text"
            value={word}
            onChange={onTypeWord}
          />

          <button
            className="absolute px-8 py-1 font-bold text-white bg-indigo-400 rounded hover:bg-indigo-500 right-1"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </>
  );
}
