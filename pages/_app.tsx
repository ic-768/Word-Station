import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import { supabase } from "lib/supabaseClient";
import {
  isPositionedLoader,
  LoaderArgs,
  LoaderContext,
  UserSessionContext,
  UserWordsContext,
  NotificationContext,
  UserFlashCardsContext,
  FlashCardGroup,
} from "context";

import { Loader, ProtectedRouteGuard } from "components";
import { Notification, NotificationProps } from "features/notifications";
import { getUserWords } from "./api/word/get-user-words";

import "../styles/globals.css";
import { getUserFlashCards } from "./api/flashcards/get-user-flashcards";
import { parseFlashCardGroups } from "features/flashcards";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // list of user-saved words - null means not fetched yet
  const [userWords, setUserWords] = useState<string[] | null>(null);

  // user login session
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // to render loading spinner
  const [loader, setLoader] = useState<LoaderArgs>(false);
  // to render notifications
  const [notification, setNotification] = useState<NotificationProps | null>();

  const [userFlashCardGroups, setUserFlashCardGroups] = useState<
    FlashCardGroup[] | null
  >([]);

  // update auth context whenever session changes
  supabase.auth.onAuthStateChange((_, newSession) => {
    setSession(newSession);
  });

  useEffect(() => {
    const initialiseSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session || null);
    };

    initialiseSession();
  }, []);

  // fetch user's words and alphabetize
  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const response = await getUserWords(session.user.id);
        const { data } = response;
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

  useEffect(() => {
    const id = session?.user.id;
    (async () => {
      if (id) {
        const response = await getUserFlashCards(id);
        const { data } = response;
        if (data) {
          const parsedflashCards = parseFlashCardGroups(data);
          setUserFlashCardGroups(parsedflashCards);
        } else {
          // TODO handle error
        }
      }
    })();
  }, [session, setUserFlashCardGroups]);

  // remove notifications after a fixed amount of time
  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 4500);
    }
  }, [notification]);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {notification && <Notification {...notification} />}
      {/* loader is true or showLoader property is set */}
      {loader && (
        <Loader
          position={isPositionedLoader(loader) ? loader.position : undefined}
        />
      )}

      <UserSessionContext.Provider value={[session, setSession]}>
        <ProtectedRouteGuard>
          <LoaderContext.Provider value={[loader, setLoader]}>
            <UserWordsContext.Provider value={[userWords, setUserWords]}>
              <UserFlashCardsContext.Provider
                value={[userFlashCardGroups, setUserFlashCardGroups]}
              >
                <NotificationContext.Provider
                  value={[notification, setNotification]}
                >
                  {getLayout(<Component {...pageProps} />)}
                </NotificationContext.Provider>
              </UserFlashCardsContext.Provider>
            </UserWordsContext.Provider>
          </LoaderContext.Provider>
        </ProtectedRouteGuard>
      </UserSessionContext.Provider>
    </>
  );
}
