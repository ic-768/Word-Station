import { FlashcardGroup } from "context";

export const parseFlashcardGroups = (data: any[]): FlashcardGroup[] =>
  Object.values(
    data.reduce((groups, item) => {
      const group = item.group;
      if (!groups[group]) {
        groups[group] = { title: group, words: [] };
      }
      groups[group].words.push(item.name);
      return groups;
    }, {})
  );
