import { FormEventHandler, ReactElement } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { LoginLayout } from "layouts";
import {
  AlternateActionText,
  CredentialPanel,
  PageTitle,
  SubmitButton,
  useLogin,
} from "features/auth";

export default function Login() {
  const onLogin = useLogin();

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onLogin}>
      <PageTitle title="Log in to Word-Station" />
      <CredentialPanel label="Email" id="email" icon={faUser} />
      <CredentialPanel
        label="Password"
        id="password"
        icon={faLock}
        type="password"
      />
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
