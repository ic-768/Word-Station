import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { InputWithIcon } from "components";

export interface CredentialPanelProps {
  label: string;
  id: string;
  icon: IconProp;
  type?: "text" | "password";
}

const CredentialPanel = (props: CredentialPanelProps) => {
  const { label, id, ...inputProps } = props;

  return (
    <div className="flex flex-col p-8 border border-teal-600 rounded-lg shadow-sm bg-neutral-900 shadow-cyan-600/50 focus-within:shadow-emerald-500/50 focus-within:shadow-md transition-all">
      <label className="text-lg" htmlFor={id}>
        {label}
      </label>
      <InputWithIcon id={id} {...inputProps} />
    </div>
  );
};
export default CredentialPanel;
