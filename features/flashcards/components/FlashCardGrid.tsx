import { Fragment } from "react";

import { WordMeanings } from "features/words";
import useFlashCardGame from "../hooks/useFlashCardGame";
import FlashCardItem from "./FlashCardItem";
import { FlashCardGroup } from "context";

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
