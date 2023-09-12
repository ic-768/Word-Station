import { FlashCardGroup } from "../../../context/user-flashcard-groups";

/**
 * Display a list of words belonging to a flashcard group
 */
const FlashCardGroup = ({
  group: { title, words },
}: {
  group: FlashCardGroup;
}) => (
  <a className="flex flex-col border-2 border-white rounded-lg cursor-pointer">
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="list-disc pl-6">
        {words.map((word, index) => (
          <li key={index} className="mb-2">
            {word}
          </li>
        ))}
      </ul>
    </div>
  </a>
);

export default FlashCardGroup;
