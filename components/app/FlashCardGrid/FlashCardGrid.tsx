import { Fragment, useState } from "react";

import { FlashCardGroup } from "../../../context/user-flashcard-groups";
import { WordMeanings } from "../../../types/WordData";

interface FlashCardGridProps {
  group: FlashCardGroup;
  meanings: WordMeanings[];
}

const FlashCardGrid = ({
  group: { title, words },
  meanings,
}: FlashCardGridProps) => {
  // Current selections
  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedDefinition, setSelectedDefinition] = useState<string>();
  // Words that user has correctly matched
  const [matchedWord, setMatchedWord] = useState<string[]>([]);

  const getWordStyle = (w: string) =>
    selectedWord === w ? "bg-green-500" : "";

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "";

  return (
    <div className="p-8 flex flex-col">
      {title}
      <ul className="grid grid-cols-2 gap-8">
        {words.map((w, i) => (
          <Fragment key={w + i}>
            <li className={`flex bg-slate-500 p-4 rounded ${getWordStyle(w)}`}>
              <button
                onClick={() => {
                  setSelectedWord(w);
                }}
                className="flex-1 ${getWordStyle(w)}"
              >
                {w}
              </button>
            </li>
            <li
              className={`flex bg-slate-500 p-4 rounded ${getDefinitionStyle(
                meanings[i]?.[0].definitions[0].definition
              )}`}
            >
              <button
                onClick={() => {
                  setSelectedDefinition(
                    meanings[i]?.[0].definitions[0].definition
                  );
                }}
                className="flex-1"
              >
                {meanings[i]?.[0].definitions[0].definition}
              </button>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default FlashCardGrid;
