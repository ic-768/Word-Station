import { Dispatch, SetStateAction } from "react";
import PageButtons from "./PageButtons";
import PageCounter from "./PageCounter";

interface FooterProps {
  page: number;
  numPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Footer = ({ page, numPages, setPage }: FooterProps) => (
  <div className="sticky bottom-0 pt-4 mt-auto bg-white">
    <PageButtons page={page} numPages={numPages} setPage={setPage} />
    <PageCounter page={page} numPages={numPages} />
  </div>
);
export default Footer;
