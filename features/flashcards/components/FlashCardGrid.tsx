import { Fragment, useCallback, useEffect, useState } from "react";

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
  // Use these to display words and meanings so we can filter them
  const [displayedWords, setDisplayedWords] = useState(words);
  const [displayedDefinitions, setDisplayedDefinitions] = useState(
    meanings.map((m) => extractDefinition(m[0]))
  );

  // Current selections
  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedDefinition, setSelectedDefinition] = useState<string>();
  // array of objects with a definition, and the word that it belongs to
  const [randomPairs, setRandomPairs] = useState<WordDefinitionPair[]>([]);

  useEffect(() => {
    setDisplayedWords(words);
  }, [words]);

  useEffect(() => {
    setDisplayedDefinitions(meanings.map((m) => extractDefinition(m[0])));
  }, [meanings]);

  useEffect(() => {
    setRandomPairs(
      randomise<WordDefinitionPair>(
        meanings.map((m, i) => [words[i], extractDefinition(m[0])])
      )
    );
  }, [meanings, words]);

  // Check to see if a definition and a word have been selected to check for a match
  useEffect(() => {
    if (!selectedWord || !selectedDefinition) return;

    if (isMatch(randomPairs, [selectedWord, selectedDefinition])) {
      setDisplayedWords((words) => words.filter((w) => w !== selectedWord));
      setDisplayedDefinitions((definitions) =>
        definitions.filter((d) => d !== selectedDefinition)
      );
    }

    setSelectedWord(undefined);
    setSelectedDefinition(undefined);
  }, [selectedWord, selectedDefinition, randomPairs]);

  const getWordStyle = (w: string) => {
    console.log(selectedWord, w);
    return selectedWord === w ? "bg-green-500" : "bg-slate-500 ";
  };

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "bg-slate-500 ";

  // we map over the randomized pair, and render the random word, with a definition that (probably) doesn't belong to it
  return (
    <div className="p-8 flex flex-col">
      {title}
      <ul className="grid grid-cols-2 gap-8">
        {displayedWords.map((word, i) => {
          const setDefinition = () =>
            setSelectedDefinition(displayedDefinitions[i]);
          const setWord = () => setSelectedWord(word);

          return (
            <Fragment key={word + i}>
              <li className={`flex p-4 rounded ${getWordStyle(word)}`}>
                <button onClick={setWord} className="flex-1">
                  {word}
                </button>
              </li>
              <li
                className={`flex p-4 rounded ${getDefinitionStyle(
                  displayedDefinitions[i]
                )}`}
              >
                <button onClick={setDefinition} className="flex-1">
                  {displayedDefinitions[i]}
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
