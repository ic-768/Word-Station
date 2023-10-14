import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { WordMeanings } from "features/words";
import { WordDefinitionPair } from "../types";
import { extractDefinition, isMatch, randomise } from "../utils";
import { useConfetti } from "./useConfetti";

export interface FlashCardGameHook {
  displayedWords: string[];
  displayedDefinitions: string[];
  getWordStyle: (w: string) => string;
  getDefinitionStyle: (d: string) => string;
  setSelectedWord: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedDefinition: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  score: number;
  multiplier: number;
  getConfettiInstance: (instance: any) => void;
}

export const useFlashCardGame = (
  words: string[],
  meanings: WordMeanings[]
): FlashCardGameHook => {
  const router = useRouter();
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

  const [score, setScore] = useState(0);
  // successive correct matches increment the multiplier
  const [multiplier, setMultiplier] = useState(1);

  const [shootConfetti, getConfettiInstance] = useConfetti(score, multiplier);

  const incScore = useCallback(
    () => setScore((s) => s + multiplier * 20),
    [multiplier]
  );

  const incMultiplier = useCallback(() => {
    console.log(multiplier);
    setMultiplier((m) => m + 1);
  }, [multiplier]);

  const resetMultiplier = useCallback(() => setMultiplier(1), []);

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

      setDisplayedDefinitions((definitions) => {
        const updatedDefinitions = definitions.filter(
          (d) => d !== selectedDefinition
        );

        // on win
        if (updatedDefinitions.length === 0) {
          setTimeout(() => router.push("/words/flash-cards"), 3000);
        }

        return updatedDefinitions;
      });

      shootConfetti();
      incScore();
      incMultiplier();

      // on win
    } else {
      resetMultiplier();
    }

    setSelectedWord(undefined);
    setSelectedDefinition(undefined);
  }, [
    router,
    displayedDefinitions,
    selectedWord,
    selectedDefinition,
    randomPairs,
    incScore,
    incMultiplier,
    resetMultiplier,
    shootConfetti,
  ]);

  const getWordStyle = (w: string) =>
    selectedWord === w ? "bg-green-500" : "bg-slate-500 ";

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "bg-slate-500 ";

  return {
    displayedWords,
    displayedDefinitions,
    getWordStyle,
    getDefinitionStyle,
    setSelectedWord,
    setSelectedDefinition,
    score,
    multiplier,
    getConfettiInstance,
  };
};
