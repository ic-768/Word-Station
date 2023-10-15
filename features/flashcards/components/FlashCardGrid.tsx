import { Fragment } from "react";

import FlashCardItem from "./FlashCardItem";
import { FlashCardGameHook } from "../hooks";

interface FlashCardGridProps {
  game: Omit<FlashCardGameHook, "getConfettiInstance">;
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

  return displayedWords.length === 0 ? (
    <div className="h-full w-full flex items-center justify-center text-6xl">
      YOU WIN!
    </div>
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
