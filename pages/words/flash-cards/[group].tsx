import { CSSProperties, ReactElement } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

import { AppHeaderLayout } from "layouts";
import { FlashCardGrid, useFlashCardGroupFromUrl } from "features/flashcards";
import { useFlashCardGame } from "features/flashcards";

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
  const { group, meanings } = useFlashCardGroupFromUrl();
  const { getConfettiInstance, ...flashCardGame } = useFlashCardGame(
    group?.words || [],
    meanings
  );

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

FlashCardsGroup.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
