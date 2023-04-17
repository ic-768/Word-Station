import Head from "next/head";
import { ReactElement } from "react";

const LoginLayout = ({ children }: { children: ReactElement }) => (
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
        <div className="flex flex-col w-full p-8 sm:w-96">{children}</div>
      </div>
    </main>
  </>
);

export default LoginLayout;
