import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import fsPromises from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Words({ words }: { words: string[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap p-8 gap-2">
        {words.map((w) => (
          <button className="bg-white rounded-lg shadow-lg p-6" key={w}>
            <span className="text-gray-700 mb-4">{w}</span>
          </button>
        ))}
      </div>
      <Link
        href="/words/get-meaning"
        className="self-center text-6xl hover:text-blue-600 transition-colors"
      >
        <FontAwesomeIcon icon={faCirclePlus} />
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public/mock-data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const words = JSON.parse(jsonData.toString());

  return {
    props: words,
  };
}
