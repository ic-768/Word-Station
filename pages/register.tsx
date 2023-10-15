import { ReactElement } from "react";

import { LoginLayout } from "layouts";
import {
  AlternateActionText,
  PageTitle,
  SubmitButton,
  CredentialPanel,
  useSignup,
  emailPanelProps,
  passwordPanelProps,
  repeatPasswordPanelProps,
} from "features/auth";

export default function Register() {
  const onSignup = useSignup();

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onSignup}>
      <PageTitle title="Create a new account" />
      <CredentialPanel {...emailPanelProps} />
      <CredentialPanel {...passwordPanelProps} />
      <CredentialPanel {...repeatPasswordPanelProps} />
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
