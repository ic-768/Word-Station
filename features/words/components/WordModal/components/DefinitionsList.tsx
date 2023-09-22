import { ParsedWordData } from "../../../types";

const DefinitionsList = ({
  definitions,
}: {
  definitions: ParsedWordData["definitions"];
}) => (
  <>
    <label className="text-lg font-semibold">Definitions</label>
    <ul className="ml-8 list-disc">
      {definitions.map((d) => (
        <li key={d.definition}>{d.definition}</li>
      ))}
    </ul>
  </>
);

export default DefinitionsList;
