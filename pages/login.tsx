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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onLogin(email, password);
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
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
