import { Fragment, useEffect } from "react";

import FlashCardItem from "./FlashCardItem";
import { FlashCardGameHook } from "../hooks";
import { useRouter } from "next/router";

interface FlashCardGridProps {
  game: FlashCardGameHook;
  groupTitle: string;
}

/**
 * Display words and random definitions for user to match
 */
const FlashCardGrid = ({ game, groupTitle }: FlashCardGridProps) => {
  const {
    displayedWords,
    displayedDefinitions,
    getWordStyle,
    getDefinitionStyle,
    setSelectedWord,
    setSelectedDefinition,
    score,
    multiplier,
  } = game;

  // WIP TODO -> navigate to flashcards route here
  const router = useRouter();

  // when all flash cards have been matched
  useEffect(() => {
    if (displayedWords.length === 0) {
    }
  }, [displayedWords]);

  return displayedWords.length === 0 ? (
    <span>YOU WIN</span>
  ) : (
    <div className="p-8 flex flex-col">
      {groupTitle}
      <span>Score: {score}</span>
      <span>Multiplier: X{multiplier}</span>
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
