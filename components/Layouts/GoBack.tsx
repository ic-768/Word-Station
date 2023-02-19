import { ReactElement } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const GoBackLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Link
      className="absolute right-16 text-6xl transition-colors hover:text-blue-600"
      href="/words"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
    {children}
  </>
);
