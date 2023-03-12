interface PageCounterProps {
  page: number;
  numPages: number;
}

const PageCounter = ({ page, numPages }: PageCounterProps) => (
  <div>
    {page + 1}/{numPages}
  </div>
);

export default PageCounter;
