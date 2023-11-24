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
      ? "outline outline-1 outline-white hover:"
      : "hover:text-blue-600 ";

  return (
    <Link className={`p-2 rounded transition-all ${className}`} href={href}>
      {children}
    </Link>
  );
};

export default HeaderLink;
