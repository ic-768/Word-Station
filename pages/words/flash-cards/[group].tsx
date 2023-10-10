import { useRouter } from "next/router";
import { CSSProperties, useContext, useEffect, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

import { FlashCardGroup, UserFlashCardsContext } from "context";
import { WordMeanings } from "features/words";
import {
  fetchMeaningsFromGroup,
  FlashCardGrid,
  useConfetti,
  useFlashCardGame,
} from "features/flashcards";

const fireWorkCanvasStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

/**
 * Flashcard game for a single flashcard group
 */
export default function FlashCardsGroup() {
  const router = useRouter();

  // if null, name is wrong (e.g. mangled url param)
  const [group, setGroup] = useState<FlashCardGroup | null>();
  const [userFlashCardGroups, _setUserFlashCardGroups] = useContext(
    UserFlashCardsContext
  );

  const [meanings, setMeanings] = useState<WordMeanings[]>([]);

  useEffect(() => {
    // TODO error handling
    const fetchMeanings = async () => {
      if (!group) return;
      const fetchedMeanings = await fetchMeaningsFromGroup(group);

      setMeanings(fetchedMeanings);
    };

    fetchMeanings();
  }, [group]);

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const { group } = router.query;
      setGroup(userFlashCardGroups?.find((g) => g.title === group) || null);
    }
  }, [router.query, userFlashCardGroups]);

  useEffect(() => {
    if (group === null) router.push("/words/flash-cards");
  }, [group, router]);

  const flashCardGame = useFlashCardGame(group?.words || [], meanings);
  const { getConfettiInstance } = flashCardGame;

  return group ? (
    <>
      <FlashCardGrid game={flashCardGame} groupTitle={group.title} />
      <ReactCanvasConfetti
        refConfetti={getConfettiInstance}
        style={fireWorkCanvasStyles}
      />
    </>
  ) : null;
}
