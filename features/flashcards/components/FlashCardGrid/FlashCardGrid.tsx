import { Fragment, useMemo, useState } from "react";

import { WordMeanings } from "features/words";
import FlashCardGroup from "../FlashCardGroup";

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

  const randomise = <T,>(a: T[]) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // array of objects with a definition, and the word that it belongs to
  const randomPairs = useMemo(
    () =>
      randomise(
        meanings.map((m, i) => ({
          definition: m[0].definitions[0].definition,
          word: words[i],
        }))
      ),
    [meanings, words]
  );

  const getWordStyle = (w: string) =>
    selectedWord === w ? "bg-green-500" : "bg-slate-500 ";

  const getDefinitionStyle = (d: string) =>
    d && selectedDefinition === d ? "bg-orange-500" : "bg-slate-500 ";

  // Check to see if currently selected word/definition are correct
  // Because the user can start and end the match either from the word OR from the definition,
  // we take either one as params to override the (stale) value in state.
  const isMatch = ({
    word,
    definition,
  }: {
    word?: string;
    definition?: string;
  }) => {
    // TODO don't run if no selectedWord and no selectedDefinition (bangs should go entirely)
    // or if double-clicking same thing
    const predicate = word
      ? { word, definition: selectedDefinition! }
      : { word: selectedWord!, definition: definition! };

    return randomPairs.some(
      (pair) =>
        pair.word === predicate.word && pair.definition === predicate.definition
    );
  };

  // we map over the randomized pair, and render the random word, with a definition that (probably) doesn't belong to it
  return (
    <div className="p-8 flex flex-col">
      {title}
      <ul className="grid grid-cols-2 gap-8">
        {randomPairs.map(({ word }, i) => {
          const definition = meanings[i]?.[0].definitions[0].definition;

          return (
            <Fragment key={word + i}>
              <li className={`flex p-4 rounded ${getWordStyle(word)}`}>
                <button
                  onClick={() => {
                    setSelectedWord(word);
                    // if we didn't give a param here and used selectedWord instead, selectedWord would be stale
                    console.log(isMatch({ word }));
                  }}
                  className="flex-1"
                >
                  {word}
                </button>
              </li>
              <li
                className={`flex p-4 rounded ${getDefinitionStyle(definition)}`}
              >
                <button
                  onClick={() => {
                    setSelectedDefinition(definition);
                    console.log(isMatch({ definition }));
                  }}
                  className="flex-1"
                >
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
