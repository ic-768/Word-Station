import { ParsedWordData } from "../../../types/WordData";

const SynonymsList = ({ pageData }: { pageData: ParsedWordData }) =>
  pageData.synonyms.length ? (
    <>
      <label className="text-lg font-semibold">Synonyms</label>
      <ul className="ml-8 overflow-y-auto list-disc list-inside max-h-64">
        {pageData.synonyms.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </>
  ) : null;

export default SynonymsList;
