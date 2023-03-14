import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface PageButtonsProps {
  page: number;
  numPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PageButtons = ({ page, numPages, setPage }: PageButtonsProps) => {
  const incPage = () => setPage(page + 1);
  const decPage = () => setPage(page - 1);

  return (
    <div className="flex mx-auto text-white w-72">
      {page !== 0 && (
        <Button text={"Previous"} callback={decPage} className="mr-auto" />
      )}
      {page !== numPages - 1 && (
        <Button text={"Next"} callback={incPage} className="ml-auto" />
      )}
    </div>
  );
};

export default PageButtons;
