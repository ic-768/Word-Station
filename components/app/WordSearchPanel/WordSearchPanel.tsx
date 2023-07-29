import FindNewWordButton from "../FindNewWordButton";
import WordFilter, { WordFilterProps } from "../WordFilter";

const WordSearchPanel = ({ filter, onChangeFilter }: WordFilterProps) => (
  <div className="flex flex-col items-center w-full p-4 rounded outline outline-2 gap-4 outline-slate-600 bg-slate-800 sm:w-auto sm:flex-row sm:items-end">
    <WordFilter filter={filter} onChangeFilter={onChangeFilter} />
    <FindNewWordButton />
  </div>
);
export default WordSearchPanel;
