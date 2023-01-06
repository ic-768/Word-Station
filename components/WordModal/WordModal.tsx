import { FormEvent, useContext, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NotificationContext } from "../../context/notification";
import { WordData } from "../../types/WordData";
import Button from "./Button";
import Link from "next/link";

const WordModal = ({
  meanings,
  word,
}: {
  meanings: WordData[];
  word?: string;
}) => {
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
    <ul className="list-disc ml-8">
      {pageData.synonyms.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );

  const decPage = () => setPage(page - 1);
  const incPage = () => setPage(page + 1);

  const goBackLink = (
    <Link
      className="absolute right-2 transition-colors hover:text-blue-600"
      href="/words/get-meaning"
    >
      <FontAwesomeIcon icon={faXmark} />
    </Link>
  );

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
    <>
      <div className="absolute top-32 bg-white rounded max-w-lg inset-x-0 mx-auto p-8 ">
        <div className="relative flex flex-col">
          <span className="text-xl font-semibold capitalize">{word}</span>
          {goBackLink}
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
              <Button
                text={"Previous"}
                callback={decPage}
                className="mr-auto"
              />
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
    </>
  );
};

export default WordModal;
