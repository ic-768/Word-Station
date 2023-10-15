import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AppHeaderLayout } from "layouts";
import { FlashCardGroup, useFlashCardGroups, useWords } from "context";

const initialGroupState = { title: "", words: [] };

export default function EditFlashCardsGroup() {
  const router = useRouter();

  const [group, setGroup] = useState<FlashCardGroup>(initialGroupState);
  const { userFlashCardGroups } = useFlashCardGroups();
  const { userWords } = useWords();

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const title = router.query.group as string;
      setGroup(
        userFlashCardGroups?.find((g) => g.title === title) || initialGroupState
      );
    }
  }, [router.query, userFlashCardGroups]);

  // TODO update DB on each change
  const onAddWord = async (w: string) => {
    setGroup({ ...group, words: [...group.words, w] });
  };

  // TODO update DB on each change
  const onRemoveWord = async (w: string) => {
    setGroup({
      ...group,
      words: group?.words.filter((words) => !words.includes(w)),
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
            {group?.words.map((w) => (
              <li
                className="cursor-pointer"
                onClick={() => onRemoveWord(w)}
                key={w}
              >
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl">Other saved words</span>
          <ul>
            {wordsNotInGroup?.map((w) => (
              <li
                className="cursor-pointer"
                onClick={() => onAddWord(w)}
                key={w}
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

EditFlashCardsGroup.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
