import { Fragment, useEffect, useState } from "react";

import { WordMeanings } from "features/words";

import { WordDefinitionPair } from "../types";
import { isMatch, randomise, extractDefinition } from "../utils";
import FlashCardGroup from "./FlashCardGroup";
import FlashCardItem from "./FlashCardItem";

interface FlashCardGridProps {
  group: FlashCardGroup;
  meanings: WordMeanings[];
  onWin: () => void;
}

const FlashCardGrid = ({
  group: { title, words },
  meanings,
  onWin,
}: FlashCardGridProps) => {
  // Use these to display words and meanings so we can filter them
  const [displayedWords, setDisplayedWords] = useState(words);
  const [displayedDefinitions, setDisplayedDefinitions] = useState<string[]>(
    []
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
      onWin();
    }

    setSelectedWord(undefined);
    setSelectedDefinition(undefined);
  }, [selectedWord, selectedDefinition, randomPairs, onWin]);

  const getWordStyle = (w: string) =>
    selectedWord === w ? "bg-green-500" : "bg-slate-500 ";

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "bg-slate-500 ";

  // we map over the randomized pair, and render the random word, with a definition that (probably) doesn't belong to it
  return (
    <div className="p-8 flex flex-col">
      {title}
      <ul className="grid grid-cols-2 gap-8">
        {displayedWords.map((word, i) => {
          const definition = displayedDefinitions[i];

          const setDefinition = () => setSelectedDefinition(definition);
          const setWord = () => setSelectedWord(word);

          return (
            <Fragment key={word + i}>
              <FlashCardItem
                className={getWordStyle(word)}
                text={word}
                onClick={setWord}
              />
              <FlashCardItem
                className={getDefinitionStyle(definition)}
                text={definition}
                onClick={setDefinition}
              />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default FlashCardGrid;
