import { FormEvent, useRef, useState } from "react";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 *
 * TODO when we get the results, we want to give the user the option of which definitions to keep
 * e.g. the word 'ball' can be used as a verb, and as a noun. As a noun it may mean the spherical object
 * or a good time, as in 'having a ball'. Card-like UI, with arrows for user to see different definitions,
 * and be able to "star" the ones they want to keep
 */

// each JSON response has various objects corresponding to each meaning. The modal
// should take all meanings and let user browse them => TODO add an arrow to let user browse definitions

interface wordData {
  definitions: {
    definition: string;
    example: string;
    antonyms: string[];
    synonyms: string[];
  }[];
  synonyms: string[];
}

const Modal = ({ meanings }: { meanings: wordData[] }) => {
  const [page, setPage] = useState(0);

  console.log(meanings[page]);
  if (!meanings[page]) return null;

  return (
    <>
      <div>
        <div>
          {meanings[page].definitions.map((d) => (
            <span key={d.definition}>{d.definition}</span>
          ))}
        </div>
        <div>
          {meanings[page].synonyms.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default function GetMeaning() {
  const [wordData, setWordData] = useState<wordData[] | null>(null);

  // if/when we need to do something more fancy, like add debounce, we can useState instead of useRef
  const inputRef = useRef<HTMLInputElement | null>(null);

  // TODO in backend -> verify if word exists -> if no, save it -> else error
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = inputRef.current?.value;

    // TODO error handling, try-catch, etc.
    const response = await fetch("/api/word/get-meaning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    try {
      const word = await response.json();
      setWordData(word.meanings);
    } catch {
      // TODO set error message
      console.log("Error in word meaning fetch");
    }
  };

  return (
    <>
      {wordData && <Modal meanings={wordData} />}
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
        <label
          className="block font-bold mb-2 text-gray-700 text-sm uppercase"
          htmlFor="input"
        >
          Input Label
        </label>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          id="input"
          type="text"
          ref={inputRef}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Submit
        </button>
      </form>
    </>
  );
}
