import { ChangeEventHandler } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Input used to filter the user's words
 */
export const WordFilter = ({
  onChangeFilter,
}: {
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col width-max">
    <label>Filter words</label>
    <div className="flex items-center bg-white gap-1 rounded-md focus-within:ring focus-within:ring-indigo-500">
      <input
        onChange={onChangeFilter}
        className="px-4 py-2 text-black bg-transparent appearance-none focus:outline-none transition-shadow leading-5"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-2 text-black" />
    </div>
  </div>
);
