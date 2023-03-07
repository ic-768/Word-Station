import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

/**
 * Button to redirect user to search for a new word
 */
export const FindNewWordButton = () => (
  <div className="flex flex-col">
    <label>Add new word</label>
    <Link
      className="text-4xl text-neutral-900 hover:text-blue-600 transition-colors"
      href="words/get-meaning"
    >
      <FontAwesomeIcon icon={faSquarePlus} />
    </Link>
  </div>
);
