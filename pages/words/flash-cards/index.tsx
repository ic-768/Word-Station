import { ReactElement, useContext } from "react";

import { UserFlashCardsContext } from "../../../context";
import { FlashCardGroup } from "../../../features/flashcards";
import { UserStatusLayout, GoBackLayout } from "../../../layouts";

/*
 * Page for user to create and organise groups of word flashcards.
 */
export default function FlashCards() {
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  return (
    <div className="p-8 flex flex-col">
      <span className="text-lg font-bold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashCardGroups?.map((group, i) => (
          <FlashCardGroup key={group.title + i} group={group} />
        ))}
      </div>
    </div>
  );
}

FlashCards.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserStatusLayout>
      <GoBackLayout>{page}</GoBackLayout>
    </UserStatusLayout>
  );
};
