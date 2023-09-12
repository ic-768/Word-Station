import { ReactElement, useContext } from "react";

import GoBackLayout from "../../../components/layouts/GoBackLayout";
import UserStatusLayout from "../../../components/layouts/UserStatusLayout";
import {
  FlashCardGroup,
  UserFlashCardsContext,
} from "../../../context/user-flashcard-groups";

const renderGroup = (group: FlashCardGroup) => {
  const { title, words } = group;
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="list-disc pl-6">
        {words.map((word, index) => (
          <li key={index} className="mb-2">
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

/*
 * Page for user to create and organise groups of word flashcards.
 */
export default function FlashCards() {
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  return (
    <>
      <span className="text-lg font-bold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashCardGroups?.map((group, i) => (
          <div
            key={i}
            className="flex flex-col border-2 border-white p-2 rounded-lg"
          >
            {renderGroup(group)}
          </div>
        ))}
      </div>
    </>
  );
}

FlashCards.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserStatusLayout>
      <GoBackLayout>{page}</GoBackLayout>
    </UserStatusLayout>
  );
};
