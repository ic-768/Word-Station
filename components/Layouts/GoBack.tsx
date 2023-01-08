import { ReactElement } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const GoBackLayout = ({ children }: { children: ReactElement }) => (
  <div>
    <Link
      className="absolute right-40 text-6xl transition-colors hover:text-blue-600"
      href="/words"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
    {children}
  </div>
);
