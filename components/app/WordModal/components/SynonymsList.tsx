import { ParsedWordData } from "../../../../types/WordData";

const SynonymsList = ({ synonyms }: { synonyms: ParsedWordData["synonyms"] }) =>
  synonyms.length ? (
    <>
      <label className="text-lg font-semibold">Synonyms</label>
      <ul className="ml-8 list-disc list-inside">
        {synonyms.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </>
  ) : null;

export default SynonymsList;
