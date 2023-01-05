import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { WordData } from "../../types/WordData";
import WordModal from "../../components/WordModal/WordModal";
import type { Notification } from "../../types/Notification";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 * TODO be able to "star" the ones they want to keep
 */
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

  const closeModal = () => setWordData(null);

  return (
    <>
      {WordData && (
        <WordModal
          setNotification={setNotification}
          meanings={WordData}
          closeModal={closeModal}
          word={inputRef.current?.value}
        />
      )}
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg mt-32">
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
