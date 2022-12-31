import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

// TODO this shouldn't live here
export interface Notification {
  type: "error" | "success" | "default";
  message: string;
}

// TODO css based on type
const Notification = ({ type, message }: Notification) => {
  return (
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
};

export default function App({ Component, pageProps }: AppProps) {
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Component {...pageProps} setNotification={setNotification} />
    </>
  );
}
