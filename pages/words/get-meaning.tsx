import {
  Dispatch,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Notification } from "../_app";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 *
 * TODO when we get the results, we want to give the user the option of which definitions to keep
 * e.g. the word 'ball' can be used as a verb, and as a noun. As a noun it may mean the spherical object
 * or a good time, as in 'having a ball'. Card-like UI, with arrows for user to see different definitions,
 * and be able to "star" the ones they want to keep
 */

interface WordData {
  definitions: {
    definition: string;
    example: string;
    antonyms: string[];
    synonyms: string[];
  }[];
  synonyms: string[];
}

const WordModal = ({ meanings }: { meanings: WordData[] }) => {
  const [page, setPage] = useState(0);
  const pageData = meanings[page];

  if (!pageData) return null;

  const definitions = (
    <ul className="list-disc ml-8">
      {pageData.definitions.map((d) => (
        <li key={d.definition}>{d.definition}</li>
      ))}
    </ul>
  );

  const synonyms = (
    <ul className="list-disc ml-8">
      {pageData.synonyms.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );

  interface Button {
    text: string;
    callback: MouseEventHandler;
    position: "left" | "right";
  }

  const Button = ({ text, callback, position }: Button) => {
    const positionClass = position === "left" ? "mr-auto" : "ml-auto";

    return (
      <button
        className={`bg-slate-400 p-2 rounded min-w-page-button ${positionClass}`}
        onClick={callback}
      >
        {text}
      </button>
    );
  };

  const decPage = () => setPage(page - 1);
  const incPage = () => setPage(page + 1);

  return (
    <>
      <div className="absolute top-32 bg-white rounded max-w-lg inset-x-0 mx-auto p-6 flex flex-col">
        <label className="text-lg font-semibold">Definitions</label>
        {definitions}

        {pageData.synonyms.length ? (
          <>
            <label className="text-lg font-semibold">Synonyms</label>
            {synonyms}
          </>
        ) : null}

        <div className="flex text-white -center mt-6 w-72">
          {page !== 0 && (
            <Button text={"Previous"} callback={decPage} position="left" />
          )}
          {page !== meanings.length - 1 && (
            <Button text={"Next"} callback={incPage} position="right" />
          )}
        </div>
        <div>
          {page + 1}/{meanings.length}
        </div>
      </div>
    </>
  );
};

export default function GetMeaning({
  setNotification,
}: {
  setNotification: Dispatch<SetStateAction<Notification | null>>;
}) {
  const [WordData, setWordData] = useState<WordData[] | null>(null);

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
      // TODO set error message depending on error code
      setNotification({
        type: "error",
        message:
          "Something went wrong when fetching the word. It's possible that the word may not exist or that your internet connection isn't great. It might also be the server at fault. Sorry!",
      });
    }
  };

  return (
    <>
      {WordData && <WordModal meanings={WordData} />}
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
