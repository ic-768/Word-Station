import Link from "next/link";
import { FlashCardGroup } from "../../../../context/user-flashcard-groups";

/**
 * Display a list of words belonging to a flashcard group
 */
const FlashCardGroup = ({
  group: { title, words },
}: {
  group: FlashCardGroup;
}) => (
  <Link
    href={`flash-cards/${title}`}
    className="flex flex-col border-2 border-white rounded-lg"
  >
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 h-full">
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
);

export default FlashCardGroup;
