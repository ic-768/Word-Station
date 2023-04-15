import { faUser } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import InputWithIcon from "../components/InputWithIcon";

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
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-700 whitespace-nowrap">
              Log in to Word-Station
            </span>
            <label className="text-black" htmlFor="username">
              Username
            </label>
            <InputWithIcon
              placeholder="e.g. surreptitious"
              text="test"
              setText={() => null}
              id="username"
              icon={faUser}
            />
            <label className="text-black" htmlFor="password">
              Password
            </label>
            <InputWithIcon
              placeholder="e.g. surreptitious"
              text="test"
              setText={() => null}
              id="password"
              icon={faUser}
            />
          </div>
        </div>
      </main>
    </>
  );
}
