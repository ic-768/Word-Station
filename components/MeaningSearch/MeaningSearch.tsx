import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
const MeaningSearch = () => {
  const [word, setWord] = useState("");
  const router = useRouter();

  const onTypeWord: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWord(e.target?.value);

  const onChooseWord: FormEventHandler = (e) => {
    e.preventDefault();
    router.push(`/words/get-meaning/${word}`);
  };

  return (
    <form
      onSubmit={onChooseWord}
      className="max-w-sm mx-auto mt-12 sm:max-w-lg"
    >
      <label className="block mb-2 text-sm font-bold uppercase" htmlFor="input">
        Search for a word
      </label>
      <div className="relative flex items-center content-center overflow-hidden rounded-md focus-within:ring focus-within:ring-indigo-500 transition">
        <input
          placeholder="e.g. surreptitious"
          className="w-full px-3 py-1.5 text-gray-500 focus:text-gray-700 focus:outline-none"
          id="input"
          type="text"
          value={word}
          onChange={onTypeWord}
        />

        <button
          className="absolute right-0 px-8 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
          type="submit"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </form>
  );
};

export default MeaningSearch;
