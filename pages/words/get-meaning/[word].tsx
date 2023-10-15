import { ReactElement, useState } from "react";

import { AppHeaderLayout } from "layouts";
import { WordModal, MeaningSearch, useWordFromUrl } from "features/words";

export default function WordMeaning() {
  const { word, wordMeanings } = useWordFromUrl();

  return (
    <>
      <MeaningSearch />
      <WordModal meanings={wordMeanings} word={word} />
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
