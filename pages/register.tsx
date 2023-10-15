import { FormEventHandler, ReactElement } from "react";
import { useRouter } from "next/router";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { LoginLayout } from "layouts";
import { useLoader, useNotification } from "context";
import {
  AlternateActionText,
  PageTitle,
  SubmitButton,
  CredentialPanel,
  CredentialPanelProps,
  signup,
  validatePassword,
} from "features/auth";

export default function Register() {
  const { setNotification } = useNotification();
  const { setLoader } = useLoader();
  const router = useRouter();

  const onSignUp = async (email: string, password: string) => {
    setLoader({ showLoader: true, position: "inset-x-0 mx-auto top-16" });

    const { data, error } = await signup(email, password);
    setNotification(
      error
        ? { type: "error", message: error.message }
        : { type: "success", message: "You have successfully signed up!" }
    );

    setLoader(false);
  };

  const onRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordValidation = formData.get("password-validation") as string;

    const passwordError = validatePassword(password, passwordValidation);

    if (passwordError) {
      setNotification(passwordError);
    } else {
      await onSignUp(email, password);
      router.push("/words");
    }
  };

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
    <form className="flex flex-col items-center gap-5" onSubmit={onRegister}>
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
