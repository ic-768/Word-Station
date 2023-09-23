export const getDictionaryReponse = async (word: string) => {
  const dictionaryResponse = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  return await dictionaryResponse.json();
};
