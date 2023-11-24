import { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { InputWithButton } from "components";
import { getFormFields } from "utils";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
const MeaningSearch = () => {
  const router = useRouter();

  const onChooseWord: FormEventHandler = (e) => {
    e.preventDefault();
    const [word] = getFormFields(e, "word");
    router.push(`/words/get-meaning/${word}`);
  };

  return (
    <form
      onSubmit={onChooseWord}
      className="max-w-sm px-10 mx-auto mt-4 sm:max-w-lg sm:px-0 sm:mt-2"
    >
      <label className="block mb-2 text-xl font-semibold" htmlFor="word">
        Search for a word
      </label>

      <InputWithButton
        placeholder="e.g. surreptitious"
        id="word"
        icon={faMagnifyingGlass}
      />
    </form>
  );
};

export default MeaningSearch;
