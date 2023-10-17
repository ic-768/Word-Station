import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";

import {
  isPositionedLoader,
  LoaderArgs,
  LoaderContext,
  UserSessionContext,
  UserWordsContext,
  NotificationContext,
  UserFlashcardsContext,
} from "context";
import { Loader, ProtectedRouteGuard } from "components";
import { useNotificationState } from "hooks";

import { Notification } from "features/notifications";
import { useUserSession } from "features/auth";
import { useFetchUserWords } from "features/words";
import { useFetchUserFlashcardGroups } from "features/flashcards";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [loader, setLoader] = useState<LoaderArgs>(false);
  const { session, setSession } = useUserSession();
  const { notification, setNotification } = useNotificationState();
  const { userWords, setUserWords } = useFetchUserWords();
  const { userFlashcardGroups, setUserFlashcardGroups } =
    useFetchUserFlashcardGroups();

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
              <UserFlashcardsContext.Provider
                value={[userFlashcardGroups, setUserFlashcardGroups]}
              >
                <NotificationContext.Provider
                  value={[notification, setNotification]}
                >
                  {getLayout(<Component {...pageProps} />)}
                </NotificationContext.Provider>
              </UserFlashcardsContext.Provider>
            </UserWordsContext.Provider>
          </LoaderContext.Provider>
        </ProtectedRouteGuard>
      </UserSessionContext.Provider>
    </>
  );
}
