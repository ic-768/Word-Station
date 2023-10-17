import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FlashcardGroup, useFlashcardGroups } from "context";
import { WordMeanings } from "features/words";
import { fetchMeaningsFromGroup } from "../api";

export const useFlashcardGroupFromUrl = () => {
  const router = useRouter();

  // if null, name is wrong (e.g. mangled url param)
  const [group, setGroup] = useState<FlashcardGroup | null>();
  const { userFlashcardGroups } = useFlashcardGroups();

  const [meanings, setMeanings] = useState<WordMeanings[]>([]);
  // get meanings for group
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
      setGroup(userFlashcardGroups?.find((g) => g.title === group) || null);
    }
  }, [router.query, userFlashcardGroups]);

  // redirect if no group
  useEffect(() => {
    if (group === null) router.push("/words/flashcards");
  }, [group, router]);

  return { group, meanings };
};
