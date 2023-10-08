import { Fragment } from "react";

import { FlashCardGroup } from "context";
import { WordMeanings } from "features/words";

import FlashCardItem from "./FlashCardItem";
import { useFlashCardGame } from "../hooks";

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
  const [
    displayedWords,
    displayedDefinitions,
    getWordStyle,
    getDefinitionStyle,
    setSelectedWord,
    setSelectedDefinition,
  ] = useFlashCardGame(words, meanings, onWin);

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
