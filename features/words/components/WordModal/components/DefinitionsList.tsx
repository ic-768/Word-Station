import { ParsedWordData } from "features/words";

const DefinitionsList = ({
  definitions,
}: {
  definitions: ParsedWordData["definitions"];
}) => (
  <>
    <label className="text-lg font-semibold">Definitions</label>
    <ul className="ml-8 list-disc">
      {definitions.map((d, i) => (
        <li key={d.definition + i}>{d.definition}</li>
      ))}
    </ul>
  </>
);

export default DefinitionsList;
