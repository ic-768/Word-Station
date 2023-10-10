import { useEffect, useState } from "react";

import { WordMeanings } from "features/words";
import { WordDefinitionPair } from "../types";
import { extractDefinition, isMatch, randomise } from "../utils";

export const useFlashCardGame = (
  words: string[],
  meanings: WordMeanings[],
  onWin: () => void
) => {
  // pairs of words with their corresponding definitions
  const [randomPairs, setRandomPairs] = useState<WordDefinitionPair[]>([]);

  // word / definition the user has clicked to match
  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedDefinition, setSelectedDefinition] = useState<string>();

  // to omit already matched words and definitions
  const [displayedWords, setDisplayedWords] = useState(words);
  const [displayedDefinitions, setDisplayedDefinitions] = useState<string[]>(
    []
  );

  useEffect(() => {
    setDisplayedWords(words);
  }, [words]);

  useEffect(() => {
    setDisplayedDefinitions(randomPairs.map((p) => p[1]));
  }, [randomPairs]);

  // shuffle words and definitions
  useEffect(() => {
    setRandomPairs(
      randomise<WordDefinitionPair>(
        meanings.map((m, i) => [words[i], extractDefinition(m[0])])
      )
    );
  }, [meanings, words]);

  // logic when a word and definition have been selected
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

  return [
    displayedWords,
    displayedDefinitions,
    getWordStyle,
    getDefinitionStyle,
    setSelectedWord,
    setSelectedDefinition,
  ] as const;
};
