import Link from "next/link";

/**
 * Display a user word - redirect to the word's meaning on click
 */
const WordCard = ({ word }: { word: string }) => (
  <Link
    href={`words/get-meaning/${word}`}
    className="w-full p-3 text-center border rounded-lg shadow-md pointer hover:bg-neutral-600 transition-colors"
  >
    {word}
  </Link>
);

export default WordCard;
