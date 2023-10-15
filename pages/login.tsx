import { ReactElement } from "react";

import { LoginLayout } from "layouts";
import {
  AlternateActionText,
  CredentialPanel,
  emailPanelProps,
  PageTitle,
  passwordPanelProps,
  SubmitButton,
  useLogin,
} from "features/auth";

export default function Login() {
  const onLogin = useLogin();

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onLogin}>
      <PageTitle title="Log in to Word-Station" />
      <CredentialPanel {...emailPanelProps} />
      <CredentialPanel {...passwordPanelProps} />
      <AlternateActionText
        text="Don't have an account? Register"
        link="/register"
      />
      <SubmitButton text="Log in" />
    </form>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
