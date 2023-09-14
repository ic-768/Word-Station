import { Fragment } from "react";

import { FlashCardGroup } from "../../../context/user-flashcard-groups";
import { WordMeanings } from "../../../types/WordData";

interface FlashCardGridProps {
  group: FlashCardGroup;
  meanings: WordMeanings[];
}

const FlashCardGrid = ({ group, meanings }: FlashCardGridProps) => (
  <div className="flex flex-col">
    {group.title}
    <ul className="grid grid-cols-2 gap-6">
      {group.words.map((w, i) => (
        <Fragment key={w + i}>
          <li>{w}</li>
          <li>{meanings[i]?.[0].definitions[0].definition} </li>
        </Fragment>
      ))}
    </ul>
  </div>
);

export default FlashCardGrid;
