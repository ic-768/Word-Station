import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AppHeaderLayout } from "layouts";
import {
  FlashCardGroup,
  UserFlashCardsContext,
  UserWordsContext,
} from "context";

export default function EditFlashCardsGroup() {
  const router = useRouter();

  const [group, setGroup] = useState<FlashCardGroup | null>();

  const [userFlashCardGroups] = useContext(UserFlashCardsContext);
  const [userWords] = useContext(UserWordsContext);

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const title = router.query.group as string;

      setGroup(userFlashCardGroups?.find((g) => g.title === title) || null);
    }
  }, [router.query, group, userFlashCardGroups]);

  const wordsNotInGroup = userWords?.filter((w) => !group?.words.includes(w));

  return (
    <div className="flex gap-6">
      <span className="text-4xl">{group?.title}</span>
      <ul>
        {group?.words.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>

      <ul>
        {wordsNotInGroup?.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}

EditFlashCardsGroup.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
