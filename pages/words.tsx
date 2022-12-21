// Fetching data from the JSON file
import fsPromises from "fs/promises";
import path from "path";

/*Home page goes here*/
export default function Words({ words }: { words: string[] }) {
  return (
    <div>
      {words.map((w) => (
        <div>{w}</div>
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
