import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

/**
 * Button to redirect user to search for a new word
 */
const FindNewWordButton = () => (
  <button className="flex flex-col">
    <Link
      className="flex items-center p-2 text-white bg-green-600 rounded-lg transition-colors gap-2 hover:bg-green-700"
      href="words/get-meaning"
    >
      <FontAwesomeIcon className="text-xl" icon={faPlus} />
      <label className="pointer-events-none">Add new word</label>
    </Link>
  </button>
);

export default FindNewWordButton;
