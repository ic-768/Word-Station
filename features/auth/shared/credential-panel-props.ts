import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { CredentialPanelProps } from "../components";

export const emailPanelProps: CredentialPanelProps = {
  label: "Email",
  id: "email",
  icon: faUser,
};

export const passwordPanelProps: CredentialPanelProps = {
  label: "Password",
  id: "password",
  icon: faLock,
  type: "password",
};

export const repeatPasswordPanelProps: CredentialPanelProps = {
  label: "Repeat password",
  id: "password-validation",
  icon: faLock,
  type: "password",
};
