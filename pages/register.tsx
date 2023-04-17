import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";
import LoginLayout from "../components/layouts/LoginLayout";
import PageTitle from "../components/login/PageTitle";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const router = useRouter();

  const updateUsername: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const updatePasswordValidation: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPasswordValidation(e.target?.value);

  const onRegister: MouseEventHandler<HTMLButtonElement> = () => {
    if (password !== passwordValidation) {
      //TODO
    } else {
      //TODO
      router.push("/words");
    }
  };

  return (
    <>
      <PageTitle title="Create a new account" />
      <CredentialPanel
        label="Username"
        id="username"
        text={username}
        setText={updateUsername}
        icon={faUser}
      />
      <CredentialPanel
        label="Password"
        id="password"
        text={password}
        setText={updatePassword}
        icon={faLock}
      />
      <CredentialPanel
        label="Repeat password"
        id="password-validation"
        text={passwordValidation}
        setText={updatePasswordValidation}
        icon={faLock}
      />
      <AlternateActionText text="Already have an account? Log in" link="/" />
      <SubmitButton text="Register" onSubmit={onRegister} />
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
