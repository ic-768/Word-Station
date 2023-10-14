import Link from "next/link";
import { FlashCardGroup } from "context/user-flashcard-groups";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

/**
 * Display a list of words belonging to a flashcard group
 */
const FlashCardGroup = ({
  group: { title, words },
}: {
  group: FlashCardGroup;
}) => (
  <div className="relative">
    <Link href={`/words/flash-cards/edit/${title}`}>
      <FontAwesomeIcon
        className="absolute top-4 right-4 border border-white rounded-full p-2 pointer-cursor bg-white text-black hover:bg-gray-300 cursor-pointer"
        icon={faPencil}
      />
    </Link>
    <Link
      href={`flash-cards/${title}`}
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
export default FlashCardGroup;
