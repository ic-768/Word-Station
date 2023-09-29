import Link from "next/link";

interface AlternateActionTextProps {
  text: string;
  link: string;
}

const AlternateActionText = ({ text, link }: AlternateActionTextProps) => (
  <span>
    {text}
    <div className="relative inline">
      <Link
        href={link}
        className="p-1 rounded-full text-emerald-300 transition-colors hover:text-emerald-400
              relative before:content-[''] before:absolute before:block before:w-full before:h-[1px]
              before:bottom-0 before:left-1 before:bg-emerald-400
              before:hover:scale-x-90 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
      >
        here
      </Link>
    </div>
  </span>
);
export default AlternateActionText;
