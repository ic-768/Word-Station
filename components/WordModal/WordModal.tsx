import { FormEvent, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { WordData } from "../../types/WordData";
import Button from "./Button";

const WordModal = ({
  meanings,
  closeModal,
  word,
}: {
  meanings: WordData[];
  closeModal: () => void;
  word?: string;
}) => {
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

  const decPage = () => setPage(page - 1);
  const incPage = () => setPage(page + 1);

  const closeButton = (
    <button
      className="absolute right-2 transition-colors hover:text-blue-600"
      onClick={closeModal}
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );

  // TODO onSave -> give UI for user to choose which entries keep - toggle individual, page, all
  const handleSave = async (event: FormEvent) => {
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
      setNotification({
        type: "error",
        message:
          "Something went wrong when fetching the word. It's possible that the word may not exist or that your internet connection isn't great. It might also be the server at fault. Sorry!",
      });
    }
  };

  const saveButton = (
    <button className="absolute top-10 text-white -right-16 bg-slate-600 p-2 rounded transition-colors hover:bg-slate-700">
      Save
    </button>
  );

  return (
    <>
      <div className="absolute top-32 bg-white rounded max-w-lg inset-x-0 mx-auto p-8 ">
        <div className="relative flex flex-col">
          <span className="text-xl font-semibold capitalize">{word}</span>
          {closeButton}
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
