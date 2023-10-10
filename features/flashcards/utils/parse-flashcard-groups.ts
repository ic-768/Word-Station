import { FlashCardGroup } from "context";

export const parseFlashCardGroups = (data: any[]): FlashCardGroup[] =>
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
