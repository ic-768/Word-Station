import { ReactElement, useContext } from "react";
import GoBackLayout from "../../../components/layouts/GoBackLayout";
import UserStatusLayout from "../../../components/layouts/UserStatusLayout";
import { UserFlashCardsContext } from "../../../context/user-flashcard-groups";

/*
 * Page for user to create and organise groups of word flashcards.
 */
export default function FlashCards() {
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  return (
    <div className="relative flex flex-col items-center w-screen h-screen p-8">
      <span className="text-lg font-bold">Flash card groups</span>
      {userFlashCardGroups?.map((group, i) => (
        <div key={i} className="flex flex-col border-2 border-white p-2">
          {group.map((word, i) => (
            <span key={word + i}>{word}</span>
          ))}
        </div>
      ))}
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
