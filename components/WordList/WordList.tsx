import WordCard from "./WordCard";

/**
 * List the user's words in a grid
 */
const WordList = ({ words }: { words: string[] }) => (
  <section className="w-screen p-8 overflow-x-auto h-4/5">
    <div className="justify-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
      {words.map((w) => (
        <WordCard key={w} word={w} />
      ))}
    </div>
  </section>
);

export default WordList;
