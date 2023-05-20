import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import { NotificationContext } from "../context/notification";
import Notification, {
  NotificationProps,
} from "../components/common/Notification";
import { UserWordsContext } from "../context/user-words";
import { getUserWords } from "./api/word/get-user-words";

import "../styles/globals.css";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { UserSessionContext } from "../context/user-session";
import RouteGuard from "../components/common/RouteGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [notification, setNotification] = useState<NotificationProps | null>();
  // list of user-saved words - null means not fetched yet
  const [userWords, setUserWords] = useState<string[] | null>(null);

  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // update auth context whenever session changes
  supabase.auth.onAuthStateChange((_, newSession) => {
    setSession(newSession);
  });

  useEffect(() => {
    const initialiseSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
      } else {
        setSession(null);
      }
    };

    initialiseSession();
  }, []);

  // fetch user's words and alphabetize
  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const response = await getUserWords(session.user.id);
        const data = response.data;
        if (data) {
          const sortedWords = data.map((d) => d.name).sort();
          // update user words context
          setUserWords(sortedWords);
        } else {
          // TODO set error
        }
      })();
    }
  }, [session?.user.id]);

  // remove notifications after a fixed amount of time
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

      <UserSessionContext.Provider value={[session, setSession]}>
        <RouteGuard>
          <UserWordsContext.Provider value={[userWords, setUserWords]}>
            <NotificationContext.Provider
              value={[notification, setNotification]}
            >
              {getLayout(<Component {...pageProps} />)}
            </NotificationContext.Provider>
          </UserWordsContext.Provider>
        </RouteGuard>
      </UserSessionContext.Provider>
    </>
  );
}
