interface PageCounterProps {
  page: number;
  numPages: number;
}

const PageCounter = ({ page, numPages }: PageCounterProps) => (
  <div className="self-end px-2 py-1 text-white bg-red-600 rounded-2xl">
    {page + 1}/{numPages}
  </div>
);

export default PageCounter;
