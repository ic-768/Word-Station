import { ChangeEventHandler } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Input used to filter the user's words
 */
const WordFilter = ({
  onChangeFilter,
}: {
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col">
    <label>Filter words</label>
    <div className="flex items-center pr-2 bg-white transition gap-1 rounded-md focus-within:ring focus-within:ring-indigo-500">
      <input
        onChange={onChangeFilter}
        className="w-full px-4 py-2 text-black bg-transparent appearance-none focus:outline-none leading-5"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
    </div>
  </div>
);

export default WordFilter;
