import { Fragment, useEffect, useMemo, useState } from "react";

import { WordMeanings } from "features/words";
import FlashCardGroup from "./FlashCardGroup";
import { WordDefinitionPair } from "../types";
import { isMatch, randomise, extractDefinition } from "../utils";

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

  // array of objects with a definition, and the word that it belongs to
  const randomPairs = useMemo(
    () =>
      randomise<WordDefinitionPair>(
        meanings.map((m, i) => [words[i], extractDefinition(m[0])])
      ),
    [meanings, words]
  );

  const getWordStyle = (w: string) =>
    selectedWord === w ? "bg-green-500" : "bg-slate-500 ";

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "bg-slate-500 ";

  // Check to see if a definition and a word have been selected to check for a match
  useEffect(() => {
    if (!selectedWord || !selectedDefinition) return;

    console.log(isMatch(randomPairs, [selectedWord, selectedDefinition]));
  }, [selectedWord, selectedDefinition, randomPairs]);

  // we map over the randomized pair, and render the random word, with a definition that (probably) doesn't belong to it
  return (
    <div className="p-8 flex flex-col">
      {title}
      <ul className="grid grid-cols-2 gap-8">
        {randomPairs.map(([word], i) => {
          const definition = extractDefinition(meanings[i]?.[0]);
          const setDefinition = () => setSelectedDefinition(definition);
          const setWord = () => setSelectedWord(word);

          return (
            <Fragment key={word + i}>
              <li className={`flex p-4 rounded ${getWordStyle(word)}`}>
                <button onClick={setWord} className="flex-1">
                  {word}
                </button>
              </li>
              <li
                className={`flex p-4 rounded ${getDefinitionStyle(definition)}`}
              >
                <button onClick={setDefinition} className="flex-1">
                  {definition}
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default FlashCardGrid;
