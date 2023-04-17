import Head from "next/head";
import { ChangeEventHandler, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import InputWithIcon from "../components/inputs/InputWithIcon";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

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
            <div className="flex flex-col p-8 border border-teal-600 rounded-lg bg-neutral-900">
              <label className="text-lg" htmlFor="username">
                Username
              </label>
              <InputWithIcon
                text={username}
                setText={updateUsername}
                icon={faUser}
              />
            </div>
            <div className="flex flex-col p-8 border border-teal-600 rounded-lg bg-neutral-900">
              <label className="text-lg" htmlFor="password">
                Password
              </label>
              <InputWithIcon
                text={password}
                setText={updatePassword}
                icon={faLock}
              />
            </div>
            <div className="flex justify-center gap-8">
              <button className="px-6 py-4 bg-green-600 rounded-lg whitespace-nowrap">
                Log in
              </button>
              <button className="px-6 py-4 bg-indigo-700 rounded-lg whitespace-nowrap">
                Create account
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
