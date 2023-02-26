import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import "../styles/globals.css";
import { NotificationContext } from "../context/notification";
import Notification, {
  NotificationProps,
} from "../components/Notification/Notification";
import { WordsContext } from "../context/words";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [notification, setNotification] = useState<NotificationProps | null>();
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

      <WordsContext.Provider value={[words, setWords]}>
        <NotificationContext.Provider value={[notification, setNotification]}>
          {getLayout(<Component {...pageProps} />)}
        </NotificationContext.Provider>
      </WordsContext.Provider>
    </>
  );
}
