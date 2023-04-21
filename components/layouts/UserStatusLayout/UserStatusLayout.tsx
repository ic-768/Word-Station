import { ReactElement } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

const UserStatusLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const onSignOut = async () => {
    //TODO
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  return (
    //TODO show actual user info like email
    <>
      <button onClick={onSignOut}>SIGNOUT</button>
      {children}
    </>
  );
};

export default UserStatusLayout;
