import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import InputWithIcon from "../components/inputs/InputWithIcon";

export default function Home() {
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
        <div className="w-4/5 p-12 bg-white rounded-lg h-3/5">
          <div className="flex flex-col w-2/6 p-8 bg-gray-700">
            <span className="text-xl font-bold text-blue-700 whitespace-nowrap">
              Log in to Word-Station
            </span>
            <div className="flex flex-col p-8 bg-gray-700">
              <label className="text-black" htmlFor="username">
                Username
              </label>
              <InputWithIcon
                text="username"
                setText={() => null}
                icon={faUser}
              />
            </div>
            <div className="flex flex-col p-8 bg-gray-700">
              <label className="text-black" htmlFor="password">
                Password
              </label>
              <InputWithIcon
                text="password"
                setText={() => null}
                icon={faLock}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
