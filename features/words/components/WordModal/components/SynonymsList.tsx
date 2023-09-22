import { ParsedWordData } from "../../../../types/WordData";

const SynonymsList = ({
  synonyms,
}: {
  synonyms: ParsedWordData["synonyms"];
}) => (
  <>
    <label className="text-lg font-semibold">Synonyms</label>
    <ul className="ml-8 list-disc list-inside">
      {synonyms.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  </>
);

export default SynonymsList;
