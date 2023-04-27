import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface PageButtonsProps {
  page: number;
  numPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PageButtons = ({ page, numPages, setPage }: PageButtonsProps) => {
  const isFirstPage = page === 0;
  const isLastPage = page === numPages - 1;

  const decPage = () => !isFirstPage && setPage(page - 1);
  const incPage = () => !isLastPage && setPage(page + 1);

  const getActivityStyles = (shouldBeDisabled: boolean) =>
    shouldBeDisabled
      ? "bg-neutral-400 text-black"
      : "bg-emerald-700 hover:bg-emerald-800";

  const decButtonColor = getActivityStyles(isFirstPage);
  const incButtonColor = getActivityStyles(isLastPage);

  return numPages === 1 ? null : (
    <div className="flex w-4/5 mx-auto text-white">
      <Button
        text={"Previous"}
        callback={decPage}
        className={`mr-auto ${decButtonColor}`}
      />
      <Button
        text={"Next"}
        callback={incPage}
        className={`ml-auto ${incButtonColor}`}
      />
    </div>
  );
};

export default PageButtons;
