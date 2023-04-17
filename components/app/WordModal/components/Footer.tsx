import { Dispatch, SetStateAction } from "react";
import PageButtons from "./PageButtons";
import PageCounter from "./PageCounter";

interface FooterProps {
  page: number;
  numPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Footer = ({ page, numPages, setPage }: FooterProps) => (
  <div className="sticky bottom-0 flex flex-col w-full pt-4 mt-auto bg-white gap-2">
    <PageButtons page={page} numPages={numPages} setPage={setPage} />
    <PageCounter page={page} numPages={numPages} />
  </div>
);
export default Footer;
