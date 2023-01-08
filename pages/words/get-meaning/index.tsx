import {
  ChangeEventHandler,
  FormEvent,
  ReactElement,
  useContext,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { WordMeanings } from "../../../types/WordData";
import { NotificationContext } from "../../../context/notification";
import { useRouter } from "next/router";
import { GoBackLayout } from "../../../components/Layouts/GoBack";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
export default function GetMeaning() {
  const [_wordData, setWordData] = useState<WordMeanings[] | null>(null);
  const [_notification, setNotification] = useContext(NotificationContext);
  const [word, setWord] = useState("");
  const router = useRouter();

  // TODO in backend -> verify if word exists -> if no, save it -> else error
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/word/get-meaning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
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

  const onTypeWord: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWord(e.target?.value);

  const onChooseWord = () => router.push(`/words/get-meaning/${word}`);

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg mt-12">
        <label
          className="block font-bold mb-2 text-gray-700 text-sm uppercase"
          htmlFor="input"
        >
          Search for a word
        </label>
        <div className="relative flex items-center content-center">
          <input
            placeholder="e.g. surreptitious"
            className="w-full px-3 py-1.5 bg-white border border-solid border-gray-300
                       rounded transition-colors
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="input"
            type="text"
            value={word}
            onChange={onTypeWord}
          />

          <button
            className="absolute px-8 py-1 bg-indigo-400 hover:bg-indigo-500 text-white rounded right-1 font-bold"
            onClick={onChooseWord}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </>
  );
}

GetMeaning.getLayout = function getLayout(page: ReactElement) {
  return <GoBackLayout>{page}</GoBackLayout>;
};
