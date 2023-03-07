import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import { NotificationContext } from "../context/notification";
import Notification, {
  NotificationProps,
} from "../components/Notification/Notification";
import { UserWordsContext } from "../context/user-words";

import "../styles/globals.css";
import { getUserWords } from "./api/word/get-user-words";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [notification, setNotification] = useState<NotificationProps | null>();
  // list of user-saved words
  const [userWords, setUserWords] = useState<string[]>([]);

  // fetch user's words and alphabetize
  useEffect(() => {
    (async () => {
      const response = await getUserWords();
      const data = response.data;
      if (data) {
        const sortedWords = data.map((d) => d.name).sort();
        // update user words context
        setUserWords(sortedWords);
      } else {
        // TODO set error
      }
    })();
  }, [setUserWords]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 4500);
    }
  }, [notification]);

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <UserWordsContext.Provider value={[userWords, setUserWords]}>
        <NotificationContext.Provider value={[notification, setNotification]}>
          {getLayout(<Component {...pageProps} />)}
        </NotificationContext.Provider>
      </UserWordsContext.Provider>
    </>
  );
}
