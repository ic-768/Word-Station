interface PageCounterProps {
  page: number;
  numPages: number;
}

const PageCounter = ({ page, numPages }: PageCounterProps) => (
  <div className="text-black self-center px-2.5 py-1 text-white bg-purple-200 rounded">
    {page + 1}/{numPages}
  </div>
);

export default PageCounter;
