import { MouseEventHandler, useState } from "react";
import { WordData } from "../types/WordData";

export const WordModal = ({ meanings }: { meanings: WordData[] }) => {
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
        className={`bg-slate-400 p-2 rounded w-24 ${positionClass}`}
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

        <div className="flex text-white mt-6 w-72 mx-auto">
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
