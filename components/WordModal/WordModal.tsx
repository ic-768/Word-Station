import { FormEvent, useContext, useState } from "react";
import { NotificationContext } from "../../context/notification";
import { WordMeanings } from "../../types/WordData";
import Button from "./Button";

interface WordModalProps {
  meanings: WordMeanings;
  word?: string;
}
const WordModal = ({ meanings, word }: WordModalProps) => {
  const [page, setPage] = useState(0);
  const [_notification, setNotification] = useContext(NotificationContext);

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
    <ul className="list-disc list-inside ml-8 max-h-64 overflow-y-auto">
      {pageData.synonyms.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );

  const decPage = () => setPage(page - 1);
  const incPage = () => setPage(page + 1);

  // TODO have to keep state of all of user saved-words so as to keep track of if this word is already saved.
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

  const saveButton = (
    <button
      onClick={handleSave}
      className="absolute top-10 text-white -right-16 bg-slate-600 p-2 rounded transition-colors hover:bg-slate-700"
    >
      Save
    </button>
  );

  return (
    <div className="absolute top-32 bg-white rounded max-w-lg inset-x-0 mx-auto p-8 drop-shadow-md">
      <div className="relative flex flex-col text-gray-500">
        <span className="text-xl font-semibold capitalize">{word}</span>
        {saveButton}
        <label className="text-lg font-semibold">Definitions</label>
        {definitions}
        {pageData.synonyms.length ? (
          <>
            <label className="text-lg font-semibold">Synonyms</label>
            {synonyms}
          </>
        ) : null}

        <div className="flex text-white mt-6 w-72 mx-auto">
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
