// Fetching data from the JSON file
import fsPromises from "fs/promises";
import path from "path";

export default function Words({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap p-8 gap-2">
      {words.map((w) => (
        <div className="bg-white rounded-lg shadow-lg p-6" key={w}>
          <span className="text-gray-700 mb-4">{w}</span>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public/mock-data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const words = JSON.parse(jsonData as any);

  return {
    props: words,
  };
}
