import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Notification } from "../types/Notification";

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

export default function App({ Component, pageProps }: AppProps) {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 4500);
    }
  }, [notification]);

  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Component {...pageProps} setNotification={setNotification} />
    </>
  );
}
