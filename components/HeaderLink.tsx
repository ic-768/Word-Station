import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderLinkProps {
  href: string;
  children: ReactNode;
}

const HeaderLink = ({ href, children }: HeaderLinkProps) => {
  const router = useRouter();

  const className =
    router.pathname == href
      ? "outline outline-1 rounded outline-slate-900 shadow shadow-black"
      : "";

  return (
    <Link
      className={`hover:text-blue-600 p-2 transition-all ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
