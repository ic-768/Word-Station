import { ReactElement } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { LoginLayout } from "layouts";
import {
  AlternateActionText,
  PageTitle,
  SubmitButton,
  CredentialPanel,
  CredentialPanelProps,
  useSignup,
} from "features/auth";

export default function Register() {
  const onSignup = useSignup();

  const emailPanel: CredentialPanelProps = {
    label: "Email",
    id: "email",
    icon: faUser,
  };

  const passwordPanel: CredentialPanelProps = {
    label: "Password",
    id: "password",
    icon: faLock,
    type: "password",
  };

  const repeatPasswordPanel: CredentialPanelProps = {
    label: "Repeat password",
    id: "password-validation",
    icon: faLock,
    type: "password",
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onSignup}>
      <PageTitle title="Create a new account" />
      <CredentialPanel {...emailPanel} />
      <CredentialPanel {...passwordPanel} />
      <CredentialPanel {...repeatPasswordPanel} />
      <AlternateActionText
        text="Already have an account? Log in"
        link="/login"
      />
      <SubmitButton text="Register" />
    </form>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
