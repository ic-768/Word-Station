import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import InputWithIcon from "../InputWithIcon";

/*
 * User can submit a word in order for the backend to contact the dictionary API, and get the results.
 */
const MeaningSearch = () => {
  const [word, setWord] = useState("");
  const router = useRouter();

  const onTypeWord: ChangeEventHandler<HTMLInputElement> = (e) =>
    setWord(e.target?.value);

  const onChooseWord: FormEventHandler = (e) => {
    e.preventDefault();
    router.push(`/words/get-meaning/${word}`);
  };

  return (
    <form
      onSubmit={onChooseWord}
      className="max-w-sm px-10 mx-auto mt-12 sm:max-w-lg sm:px-0"
    >
      <label className="block mb-2 text-sm font-bold uppercase" htmlFor="input">
        Search for a word
      </label>

      <InputWithIcon
        placeholder="e.g. surreptitious"
        text={word}
        setText={onTypeWord}
        id="input"
        icon={faMagnifyingGlass}
      />
    </form>
  );
};

export default MeaningSearch;
