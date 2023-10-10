import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import {
  isPositionedLoader,
  LoaderArgs,
  LoaderContext,
  UserSessionContext,
  UserWordsContext,
  NotificationContext,
  UserFlashCardsContext,
} from "context";

import { Loader, ProtectedRouteGuard } from "components";
import { Notification, NotificationProps } from "features/notifications";
import { useUserSession } from "features/auth";
import { useFetchUserWords } from "features/words";
import { useFetchUserFlashCardGroups } from "features/flashcards";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // to render loading spinner
  const [loader, setLoader] = useState<LoaderArgs>(false);
  // to render notifications
  const [notification, setNotification] = useState<NotificationProps | null>();

  // remove notifications after a fixed amount of time
  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 4500);
    }
  }, [notification]);

  const getLayout = Component.getLayout || ((page) => page);

  const { session, setSession } = useUserSession();
  const { userWords, setUserWords } = useFetchUserWords(session?.user.id);
  const { userFlashCardGroups, setUserFlashCardGroups } =
    useFetchUserFlashCardGroups(session?.user.id);

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
