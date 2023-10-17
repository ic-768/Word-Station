import { CSSProperties, ReactElement } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

import { AppHeaderLayout } from "layouts";
import {
  FlashcardGrid,
  useFlashcardGroupFromUrl,
  useFlashcardGame,
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
 * Flashcard game for a single Flashcard group
 */
export default function FlashcardsGroup() {
  const { group, meanings } = useFlashcardGroupFromUrl();
  const { getConfettiInstance, ...FlashcardGame } = useFlashcardGame(
    group?.words || [],
    meanings
  );

  return group ? (
    <>
      <FlashcardGrid game={FlashcardGame} groupTitle={group.title} />
      <ReactCanvasConfetti
        refConfetti={getConfettiInstance}
        style={fireWorkCanvasStyles}
      />
    </>
  ) : null;
}

FlashcardsGroup.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
