export const parseDictionaryMeanings = (dictionaryResult: any) => {
  try {
    const [results] = dictionaryResult;
    const { meanings } = results;

    return meanings;
  } catch {
    return { error: "Couldn't find that word :(" };
  }
};
