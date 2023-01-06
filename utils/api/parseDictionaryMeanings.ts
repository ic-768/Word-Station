export const parseDictionaryMeanings = (dictionaryResult: any) => {
  const [results] = dictionaryResult;
  const { meanings } = results;

  return meanings;
};
