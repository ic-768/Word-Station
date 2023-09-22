/**
 * Upon successful API request for a word, we parse the data and return an array of objects like this
 */
export interface ParsedWordData {
  definitions: {
    definition: string;
    example: string;
    antonyms: string[];
    synonyms: string[];
  }[];
  synonyms: string[];
}

/**
 * If the API can't find the word, we return an object with error
 */
export type WordMeanings = ParsedWordData[] & { error: string };
