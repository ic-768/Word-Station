import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";

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
      <Head>
        <title>Word Station</title>
        <meta
          name="description"
          content="A modern and easy-to-use application for learning and memorising new words"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-11/12 p-2 rounded-lg bg-neutral-800 sm:w-4/5 sm:p-12">
          <div className="flex flex-col w-full p-8 gap-5 sm:w-96">
            <span className="text-2xl font-bold text-neutral-100 whitespace-nowrap">
              Create a new account
            </span>
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

            <AlternateActionText
              text="Already have an account? Log in"
              link="/"
            />
            <SubmitButton text="Register" onSubmit={onRegister} />
          </div>
        </div>
      </main>
    </>
  );
}
