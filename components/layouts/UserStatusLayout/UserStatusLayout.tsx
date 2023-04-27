import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import { UserSessionContext } from "../../../context/user-session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserStatusLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const [session] = useContext(UserSessionContext);

  const onSignOut = async () => {
    //TODO
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  return (
    //TODO show actual user info like email
    <>
      <div className="absolute top-0 w-full h-6 bg-white text-black p-4 flex items-center z-10">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faUser} />
          <span>{session?.user.email}</span>
        </div>
        <div className="ml-auto">
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
      {children}
    </>
  );
};

export default UserStatusLayout;
