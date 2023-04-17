import { ReactElement } from "react";

import GoBackLayout from "../../../components/layouts/GoBackLayout";
import MeaningSearch from "../../../components/app/MeaningSearch";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
export default function GetMeaning() {
  return <MeaningSearch />;
}

GetMeaning.getLayout = function getLayout(page: ReactElement) {
  return <GoBackLayout>{page}</GoBackLayout>;
};
