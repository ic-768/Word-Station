import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import { supabase } from "lib/supabaseClient";
import { useLoader, useSession } from "context";
import { HeaderLink } from "components";

const AppHeaderLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { session } = useSession();
  const { setLoader } = useLoader();

  const onSignOut = async () => {
    setLoader(true);
    const { error } = await supabase.auth.signOut();
    router.push("/login");
    setLoader(false);
  };

  return (
    <>
      <div className="sticky top-0 w-full h-8 bg-white text-black p-4 flex items-center z-10 whitespace-nowrap sm:h-12">
        <ul className="mr-auto flex gap-4">
          <li>
            <HeaderLink href="/words">words</HeaderLink>
          </li>
          <li>
            <HeaderLink href="/words/get-meaning">word meaning</HeaderLink>
          </li>
          <li>
            <HeaderLink href="/words/flash-cards">flash cards</HeaderLink>
          </li>
        </ul>
        <div className="flex gap-2 ml-auto items-center">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUser} className="h-full w-4" />
            <span>{session?.user.email}</span>
          </div>
          <button
            className="bg-orange-600 flex gap-4 items-center py-0 px-2 text-white rounded hover:bg-orange-700 text-white sm:py-1 sm:px-4 transition-colors"
            onClick={onSignOut}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="sm:text-lg" />
            Log out
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

export default AppHeaderLayout;
