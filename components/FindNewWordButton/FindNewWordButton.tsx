import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

/**
 * Button to redirect user to search for a new word
 */
export const FindNewWordButton = () => (
  <button className="flex flex-col">
    <Link
      className="flex items-center p-2 text-white bg-green-500 border rounded-lg border-lime-300 transition-colors gap-2 hover:bg-green-600"
      href="words/get-meaning"
    >
      <FontAwesomeIcon className="text-xl" icon={faPlus} />
      <label className="pointer-events-none">Add new word</label>
    </Link>
  </button>
);
