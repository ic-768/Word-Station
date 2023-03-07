interface PageCounterProps {
  page: number;
  numPages: number;
}

export const PageCounter = ({ page, numPages }: PageCounterProps) => (
  <div>
    {page + 1}/{numPages}
  </div>
);
