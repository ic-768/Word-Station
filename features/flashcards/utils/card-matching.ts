import { WordDefinitionPair } from "../types";

/**
 * Check to see if selected word and definition (predicate) are correct (contained in the wordDefinitionPairs)
 */
export const isMatch = (
  wordDefinitionPairs: WordDefinitionPair[],
  predicate: WordDefinitionPair
) =>
  wordDefinitionPairs.some(
    (pair) =>
      pair.word === predicate.word && pair.definition === predicate.definition
  );
