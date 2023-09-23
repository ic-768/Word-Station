import { ParsedWordData } from "features/words";

export const extractDefinition = (meaning: ParsedWordData) =>
  meaning.definitions[0].definition;
