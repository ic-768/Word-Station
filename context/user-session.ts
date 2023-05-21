import { Session } from "@supabase/supabase-js";
import React, { Dispatch, SetStateAction } from "react";

type UserSessionContextArgs = [
  Session | null | undefined,
  Dispatch<SetStateAction<Session | null | undefined>>
];

/**
 * Ctx to provide notification and setNotification to subcomponents. Is provided with state in outer app component.
 */
export const UserSessionContext = React.createContext<UserSessionContextArgs>([
  undefined,
  () => undefined,
]);
