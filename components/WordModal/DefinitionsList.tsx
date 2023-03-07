import { ParsedWordData } from "../../types/WordData";

export const DefinitionsList = ({ pageData }: { pageData: ParsedWordData }) => (
  <>
    <label className="text-lg font-semibold">Definitions</label>
    <ul className="ml-8 list-disc">
      {pageData.definitions.map((d) => (
        <li key={d.definition}>{d.definition}</li>
      ))}
    </ul>
  </>
);
