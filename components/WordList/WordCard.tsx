import Link from "next/link";

/**
 * Display a user word - redirect to the word's meaning on click
 */
export const WordCard = ({ word }: { word: string }) => (
  <div className="flex flex-col items-center content-center bg-white border rounded-lg shadow-md">
    <Link
      href={`words/get-meaning/${word}`}
      className="w-full p-3 text-center text-neutral-900 pointer hover:text-blue-600"
    >
      {word}
    </Link>
  </div>
);
