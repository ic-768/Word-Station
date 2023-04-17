import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import InputWithIcon from "../components/common/inputs/InputWithIcon";

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
            <div className="flex flex-col p-8 border border-teal-600 rounded-lg shadow-md bg-neutral-900 shadow-cyan-600/50 focus-within:shadow-emerald-500/50">
              <label className="text-lg" htmlFor="username">
                Username
              </label>
              <InputWithIcon
                id="username"
                text={username}
                setText={updateUsername}
                icon={faUser}
              />
            </div>
            <div className="flex flex-col p-8 border border-teal-600 rounded-lg shadow-md bg-neutral-900 shadow-cyan-600/50 focus-within:shadow-emerald-500/50">
              <label className="text-lg shadow-emerald-200" htmlFor="password">
                Password
              </label>
              <InputWithIcon
                id="password"
                text={password}
                setText={updatePassword}
                icon={faLock}
              />
            </div>
            <span>
              Don&apos;t have an account? Register
              <div className="relative inline">
                <Link
                  href="/register"
                  className="p-1 rounded-full text-emerald-300 transition-colors hover:text-emerald-400
              relative before:content-[''] before:absolute before:block before:w-full before:h-[1px]
              before:bottom-0 before:left-1 before:bg-emerald-400
              before:hover:scale-x-90 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
                >
                  here
                </Link>
              </div>
            </span>
            <button
              onClick={onLogin}
              className="self-center w-2/5 px-6 py-4 bg-green-600 rounded-lg transition-all whitespace-nowrap hover:bg-green-700 sm:w-2/4 hover:scale-110"
            >
              Log in
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
