import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AppHeaderLayout } from "layouts";
import { FlashcardGroup, useFlashcardGroups, useWords } from "context";
import {
  updateFlashcardGroup,
  removeFlashcardGroup,
} from "features/flashcards";

const initialGroupState = { title: "", words: [] };

export default function EditFlashcardsGroup() {
  const router = useRouter();
  const { userWords } = useWords();
  const { userFlashcardGroups } = useFlashcardGroups();

  const [group, setGroup] = useState<FlashcardGroup>(initialGroupState);

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const title = router.query.group as string;
      setGroup(
        userFlashcardGroups?.find((g) => g.title === title) || initialGroupState
      );
    }
  }, [router.query, userFlashcardGroups]);

  const onAddWord = (w: string) => {
    updateFlashcardGroup(w, group.title);
    setGroup({ ...group, words: [...group.words, w] });
  };

  const onRemoveWord = (w: string) => {
    removeFlashcardGroup(w, group.title);
    setGroup({
      ...group,
      words: group?.words.filter((word) => word !== w),
    });
  };

  const wordsNotInGroup = userWords?.filter((w) => !group?.words.includes(w));

  return (
    <div className="flex flex-col gap-6 items-center">
      <span className="text-4xl">{group?.title}</span>
      <div className="flex gap-8">
        <div className="flex flex-col">
          <span className="text-2xl">Words in group</span>
          <ul>
            {group?.words.map((w, i) => (
              <li
                className="cursor-pointer"
                onClick={() => onRemoveWord(w)}
                key={w + i}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl">Other saved words</span>
          <ul>
            {wordsNotInGroup?.map((w, i) => (
              <li
                className="cursor-pointer"
                onClick={() => onAddWord(w)}
                key={w + i}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

EditFlashcardsGroup.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
