import { ReactElement } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GoBackLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Link
      className="absolute z-10 text-6xl bottom-[2%] right-16 transition-colors hover:text-blue-600 sm:top-16"
      href="/words"
      title="Back to words"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
    {children}
  </>
);

export default GoBackLayout;
