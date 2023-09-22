import { ReactElement } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GoBackLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Link
      className="p-4 bg-purple-600 absolute z-10 text-6xl bottom-12 left-0 right-0 mx-auto h-20 w-20 flex justify-center rounded-full flex items-center transition-colors hover:bg-purple-700 sm:bottom-2/4 sm:left-[85%] sm:right-full"
      href="/words"
      title="Back to words"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
    {children}
  </>
);

export default GoBackLayout;
