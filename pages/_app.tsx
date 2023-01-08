import "../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Notification } from "../types/Notification";
import { NotificationContext } from "../context/notification";

// TODO css based on type
const Notification = ({ type, message }: Notification) => (
  <div
    className="
      animation-fill-forwards
      animate-slide-notification-in
      bg-white absolute flex items-center inset-0 p-8
      mx-auto min-h-[30px] max-h-[20vh] min-w-[50px] max-w-[40vw]"
  >
    {message}
  </div>
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [notification, setNotification] = useState<Notification | null>(null);

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

      <NotificationContext.Provider value={[notification, setNotification]}>
        {getLayout(<Component {...pageProps} />)}
      </NotificationContext.Provider>
    </>
  );
}
