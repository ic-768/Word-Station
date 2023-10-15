import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useState,
} from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const { setNotification } = useNotification();
  const { setLoader } = useLoader();

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const updatePasswordValidation: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPasswordValidation(e.target?.value);

  const onSignUp = async () => {
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
    const passwordError = validatePassword(password, passwordValidation);

    if (passwordError) {
      setNotification(passwordError);
    } else {
      await onSignUp();
    }
  };

  const emailPanel: CredentialPanelProps = {
    label: "Email",
    id: "email",
    text: email,
    onChange: updateEmail,
    icon: faUser,
  };

  const passwordPanel: CredentialPanelProps = {
    label: "Password",
    id: "password",
    text: password,
    onChange: updatePassword,
    icon: faLock,
    type: "password",
  };

  const repeatPasswordPanel: CredentialPanelProps = {
    label: "Repeat password",
    id: "password-validation",
    text: passwordValidation,
    onChange: updatePasswordValidation,
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
