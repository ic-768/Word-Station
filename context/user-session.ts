import { Session } from "@supabase/supabase-js";
import React, { Dispatch, SetStateAction } from "react";

type UserSessionContextArgs = [
  Session | null | undefined,
  Dispatch<SetStateAction<Session | null | undefined>>
];

export const UserSessionContext = React.createContext<UserSessionContextArgs>([
  undefined,
  () => undefined,
]);
