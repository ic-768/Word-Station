import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { NotificationContext } from "../../context/notification";
import { WordMeanings } from "../../types/WordData";
import Button from "./Button";

interface WordModalProps {
  meanings: WordMeanings;
  word?: string;
  isWordSaved?: boolean;
  setIsWordSaved: Dispatch<SetStateAction<boolean>>;
}

//THOUGHT: could use useEffect to set isWordSaved
const WordModal = ({
  meanings,
  word,
  isWordSaved,
  setIsWordSaved,
}: WordModalProps) => {
  const [page, setPage] = useState(0);
  const [_notification, setNotification] = useContext(NotificationContext);

  const pageData = meanings[page];

  if (!pageData) return null;

  const definitions = (
    <ul className="ml-8 list-disc">
      {pageData.definitions.map((d) => (
        <li key={d.definition}>{d.definition}</li>
      ))}
    </ul>
  );

  const synonyms = (
    <ul className="ml-8 overflow-y-auto list-disc list-inside max-h-64">
      {pageData.synonyms.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );

  const decPage = () => setPage(page - 1);
  const incPage = () => setPage(page + 1);

  // TODO Use function that doesn't just save => pressing on heart should toggle whether word is saved
  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/word/save-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });

      if (response.ok) {
        setNotification({
          type: "success",
          message: "Word saved successfully!",
        });
        setIsWordSaved(true);
      } else {
        setNotification({
          type: "error",
          message: "Word is already saved!",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Oops! something went wrong.",
      });
    }
  };

  // TODO handle toggle
  const handleDelete = async () => {
    try {
      await fetch("/api/word/delete-word", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
    } catch {
      // TODO catch
    }
  };

  return (
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 drop-shadow-md">
      <div className="relative flex flex-col text-gray-500">
        <FontAwesomeIcon
          fontSize={24}
          cursor="pointer"
          onClick={handleSave}
          icon={isWordSaved ? solidHeart : emptyHeart}
        />

        <button onClick={handleDelete}>DELETE</button>
        <span className="text-xl font-semibold capitalize">{word}</span>
        <label className="text-lg font-semibold">Definitions</label>
        {definitions}
        {pageData.synonyms.length ? (
          <>
            <label className="text-lg font-semibold">Synonyms</label>
            {synonyms}
          </>
        ) : null}

        <div className="flex mx-auto mt-6 text-white w-72">
          {page !== 0 && (
            <Button text={"Previous"} callback={decPage} className="mr-auto" />
          )}
          {page !== meanings.length - 1 && (
            <Button text={"Next"} callback={incPage} className="ml-auto" />
          )}
        </div>
        <div>
          {page + 1}/{meanings.length}
        </div>
      </div>
    </div>
  );
};

export default WordModal;
