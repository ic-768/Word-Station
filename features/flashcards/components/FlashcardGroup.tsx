import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FlashcardGroup } from "context/user-flashcard-groups";

/**
 * Display a list of words belonging to a Flashcard group
 */
const FlashcardGroup = ({
  group: { title, words },
}: {
  group: FlashcardGroup;
}) => (
  <div className="relative">
    <Link href={`/words/flashcards/edit/${title}`}>
      <FontAwesomeIcon
        className="absolute top-4 right-4 border border-white rounded-full p-2 pointer-cursor bg-white text-black hover:bg-gray-300 cursor-pointer"
        icon={faPencil}
      />
    </Link>
    <Link
      href={`flashcards/${title}`}
      className="flex flex-col border-2 border-white rounded-lg h-full w-full"
    >
      <div className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-md p-4 h-full transition-colors">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <ul className="list-disc pl-6">
          {words.map((w, i) => (
            <li key={w + i} className="mb-2">
              {w}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </div>
);
export default FlashcardGroup;
