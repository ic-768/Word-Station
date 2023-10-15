import { ReactElement } from "react";

import { AppHeaderLayout } from "layouts";
import { WordModal, MeaningSearch } from "features/words";

export default function WordMeaning() {
  return (
    <>
      <MeaningSearch />
      <WordModal />
    </>
  );
}

WordMeaning.getLayout = function getLayout(page: ReactElement) {
  return <AppHeaderLayout>{page}</AppHeaderLayout>;
};
