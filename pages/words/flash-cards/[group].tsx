import { useRouter } from "next/router";
import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { FlashCardGroup, UserFlashCardsContext } from "context";
import { FlashCardGrid } from "features/flashcards";
import {
  WordMeanings,
  getDictionaryReponse,
  parseDictionaryMeanings,
} from "features/words";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

/**
 * User can submit a group in order for the backend to contact the dictionary API, and get the results.
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

      const dictionaryRequests = group.words.map(getDictionaryReponse);
      // TODO extract to util
      const dictionaryResults = await Promise.all(dictionaryRequests);
      const fetchedMeanings = dictionaryResults.map(parseDictionaryMeanings);

      setMeanings(fetchedMeanings);
    };

    fetchMeanings();
  }, [group]);

  // set group based on url param
  useEffect(() => {
    if (router.query) {
      const { group } = router.query;
      setGroup(
        userFlashCardGroups?.find((g) => g.title === (group as string)) || null
      );
    }
  }, [router.query, userFlashCardGroups]);

  useEffect(() => {
    if (group === null) router.push("/words/flash-cards");
  }, [group, router]);

  /********* TODO refactor - this is confetti stuff *************/
  const refConfetti = useRef<any | null>(null);

  const getInstance = useCallback((instance: any | null) => {
    if (instance) {
      refConfetti.current = instance;
    }
  }, []);

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    refConfetti.current &&
      refConfetti.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const onWin = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  /**********************/
  return group ? (
    <>
      <FlashCardGrid group={group} meanings={meanings} onWin={onWin} />
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  ) : null;
}
