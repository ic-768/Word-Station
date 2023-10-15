import { ChangeEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface InputProps {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  icon: IconProp;
  text?: string;
  id?: string;
  type?: string;
}
