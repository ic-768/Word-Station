import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const updateUsername: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const onLogin: MouseEventHandler<HTMLButtonElement> = () => {
    //TODO
    router.push("/words");
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
        <div className="flex items-center justify-center w-11/12 p-2 rounded-lg bg-neutral-800 h-3/5 sm:w-4/5 sm:p-12">
          <div className="flex flex-col w-full p-8 gap-5 sm:w-96">
            <span className="text-2xl font-bold text-neutral-100 whitespace-nowrap">
              Log in to Word-Station
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
            <AlternateActionText
              text="Don't have an account? Register"
              link="/register"
            />
            <SubmitButton text="Log in" onSubmit={onLogin} />
          </div>
        </div>
      </main>
    </>
  );
}
