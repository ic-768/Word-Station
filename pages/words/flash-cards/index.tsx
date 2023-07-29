import { ReactElement, useContext } from "react";
import GoBackLayout from "../../../components/layouts/GoBackLayout";
import UserStatusLayout from "../../../components/layouts/UserStatusLayout";
import { UserWordsContext } from "../../../context/user-words";

/*
 * Page for user to create and organise groups of word flashcards.
 */
export default function FlashCards() {
  const [userWords, _setUserWords] = useContext(UserWordsContext);
  return (
    <div className="relative flex flex-col items-center w-screen h-screen p-8">
      {userWords?.map((w) => (
        <div key={w}>{w}</div>
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
