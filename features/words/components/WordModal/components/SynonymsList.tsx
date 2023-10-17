import { ParsedWordData } from "features/words";

const SynonymsList = ({
  synonyms,
}: {
  synonyms: ParsedWordData["synonyms"];
}) => (
  <>
    <label className="text-lg font-semibold">Synonyms</label>
    <ul className="ml-8 list-disc list-inside">
      {synonyms.map((s, i) => (
        <li key={s + i}>{s}</li>
      ))}
    </ul>
  </>
);

export default SynonymsList;
