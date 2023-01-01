import { useState } from "react";
import { WordData } from "../../types/WordData";
import Button from "./Button";

const WordModal = ({
  meanings,
  closeModal,
}: {
  meanings: WordData[];
  closeModal: () => void;
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

  return (
    <>
      <div className="absolute top-32 bg-white rounded max-w-lg inset-x-0 mx-auto p-8 ">
        <div className="relative flex flex-col">
          <button
            className="absolute right-2 transition-colors hover:text-blue-600"
            onClick={closeModal}
          >
            X
          </button>
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
