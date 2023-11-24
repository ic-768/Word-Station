import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useFlashcardGroups } from "context";
import { AppHeaderLayout } from "layouts";
import { FlashcardGroup, addFlashcardGroup } from "features/flashcards";

/*
 * Page for user to create and organise groups of word Flashcards.
 */
export default function Flashcards() {
  const { userFlashcardGroups } = useFlashcardGroups();

  return (
    <main className="relative p-8 flex flex-col">
      <span className="text-3xl font-semibold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashcardGroups?.map((group, i) => (
          <FlashcardGroup key={group.title + i} group={group} />
        ))}

        <button
          className="fixed rounded-full bg-orange-600 text-4xl hover:bg-orange-700 cursor-pointer transition-colors w-16 h-16 right-32 bottom-8 drop-shadow"
          onClick={() => addFlashcardGroup("cow")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </main>
  );
}

Flashcards.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
