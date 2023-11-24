import { ReactElement, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useFlashcardGroups } from "context";
import { AppHeaderLayout } from "layouts";
import { FlashcardGroup, addFlashcardGroup } from "features/flashcards";
import Modal from "components/Modal";

/*
 * Page for user to create and organise groups of word Flashcards.
 */
export default function Flashcards() {
  const { userFlashcardGroups } = useFlashcardGroups();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onAddGroup = () => {
    const groupName = ref.current?.value;
    if (!groupName) return;
    addFlashcardGroup(groupName);
    //TODO update local state
    closeModal();
  };
  return (
    <main className="relative p-8 flex flex-col">
      <span className="text-3xl font-semibold">Flash card groups</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userFlashcardGroups?.map((group, i) => (
          <FlashcardGroup key={group.title + i} group={group} />
        ))}

        <button
          className="fixed rounded-full bg-orange-600 text-4xl hover:bg-orange-700 cursor-pointer transition-colors w-16 h-16 right-32 bottom-8 drop-shadow"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <Modal onClose={closeModal} isOpen={modalIsOpen}>
        <div className="flex flex-col items-center h-full">
          <label>
            New group name
            <input
              ref={ref}
              className="appearance-none outline-0 text-black dark:text-white transition-all duration-300 ease-in-out border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-500 focus:border-zinc-300 dark:focus:border-zinc-800 focus:bg-transparent px-1.5 py-1.5 rounded-lg"
              placeholder="E.g. 'political terms'"
            />
          </label>
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:border-blue-600 px-5 py-1.5 rounded-lg transition-all mt-auto"
            onClick={onAddGroup}
          >
            Add
          </button>
        </div>
      </Modal>
    </main>
  );
}

Flashcards.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
