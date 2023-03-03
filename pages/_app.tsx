import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import { NotificationContext } from "../context/notification";
import Notification, {
  NotificationProps,
} from "../components/Notification/Notification";
import { UserWordsContext } from "../context/user-words";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [notification, setNotification] = useState<NotificationProps | null>();
  const [userWords, setUserWords] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>();

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
