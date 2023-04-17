import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";

interface InputWithButtonProps {
  placeholder: string;
  setText: ChangeEventHandler<HTMLInputElement>;
  icon: IconProp;
  text: string;
  id?: string;
  type?: string;
}

const InputWithButton = ({
  placeholder,
  text,
  setText,
  icon,
  id = "input",
  type = "text",
}: InputWithButtonProps) => {
  return (
    <div className="relative flex items-center content-center overflow-hidden rounded-md focus-within:ring focus-within:ring-indigo-500 transition">
      <input
        placeholder={placeholder}
        className="w-11/12 px-3 py-1.5 text-gray-500 focus:text-gray-700 focus:outline-none"
        id={id}
        type={type}
        value={text}
        onChange={setText}
      />

      <button
        className="absolute right-0 flex items-center h-full px-8 py-2 font-bold text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700 transition-colors"
        type="submit"
      >
        <FontAwesomeIcon
          icon={icon}
          className="absolute right-0 w-full h-2/4"
        />
      </button>
    </div>
  );
};

export default InputWithButton;
