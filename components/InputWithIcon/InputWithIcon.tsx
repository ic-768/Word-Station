import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";

interface InputWithIconProps {
  placeholder: string;
  setText: ChangeEventHandler<HTMLInputElement>;
  icon: IconProp;
  text: string;
  id?: string;
  type?: string;
}

const InputWithIcon = ({
  placeholder,
  text,
  setText,
  icon,
  id = "input",
  type = "text",
}: InputWithIconProps) => {
  return (
    <div className="relative flex items-center content-center overflow-hidden rounded-md focus-within:ring focus-within:ring-indigo-500 transition">
      <input
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-gray-500 focus:text-gray-700 focus:outline-none"
        id={id}
        type={type}
        value={text}
        onChange={setText}
      />

      <button
        className="absolute right-0 px-8 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
        type="submit"
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
};

export default InputWithIcon;
