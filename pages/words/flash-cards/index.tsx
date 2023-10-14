import { ReactElement, useContext } from "react";

import { UserFlashCardsContext } from "context";
import { AppHeaderLayout } from "layouts";
import { FlashCardGroup } from "features/flashcards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/*
 * Page for user to create and organise groups of word flashcards.
 */
export default function FlashCards() {
  const [userFlashCardGroups] = useContext(UserFlashCardsContext);

  return (
    <div className="p-8 flex flex-col">
      <span className="text-lg font-bold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashCardGroups?.map((group, i) => (
          <FlashCardGroup key={group.title + i} group={group} />
        ))}

        <FontAwesomeIcon
          className="h-1/6 w-full outline outline-2 rounded-lg text-6xl bg-gray-800 hover:bg-gray-900 cursor-pointer transition-colors "
          icon={faPlus}
        />
      </div>
    </div>
  );
}

FlashCards.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
