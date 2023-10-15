import { useContext } from "react";
import { UserSessionContext } from "context/user-session";

export const useSession = () => {
  const [session, setSession] = useContext(UserSessionContext);
  return { session, setSession };
};
