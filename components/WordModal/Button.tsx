import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  callback: MouseEventHandler;
  className: string;
}

const Button = ({ text, callback, className }: ButtonProps) => (
  <button
    className={`bg-slate-600 p-2 rounded w-24 ${className} transition-colors hover:bg-slate-700 `}
    onClick={callback}
  >
    {text}
  </button>
);

export default Button;
