import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  callback: MouseEventHandler;
  className: string;
}

const Button = ({ text, callback, className }: ButtonProps) => (
  <button
    className={`w-24 p-2 rounded bg-slate-600 ${className} transition-colors hover:bg-slate-700`}
    onClick={callback}
  >
    {text}
  </button>
);

export default Button;
