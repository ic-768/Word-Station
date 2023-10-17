import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useFlashcardGroups } from "context";
import { AppHeaderLayout } from "layouts";
import { FlashcardGroup } from "features/flashcards";
import { addFlashcardGroup } from "features/flashcards/api/add-flashcard";

/*
 * Page for user to create and organise groups of word Flashcards.
 */
export default function Flashcards() {
  const { userFlashcardGroups } = useFlashcardGroups();

  return (
    <div className="p-8 flex flex-col">
      <span className="text-lg font-bold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashcardGroups?.map((group, i) => (
          <FlashcardGroup key={group.title + i} group={group} />
        ))}

        <FontAwesomeIcon
          className="h-1/6 w-full outline outline-2 rounded-lg text-6xl bg-gray-800 hover:bg-gray-900 cursor-pointer transition-colors "
          icon={faPlus}
          onClick={() => addFlashcardGroup("cow")}
        />
      </div>
    </div>
  );
}

Flashcards.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
