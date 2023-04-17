interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => (
  <span className="text-2xl font-bold text-neutral-100 whitespace-nowrap">
    {title}
  </span>
);
export default PageTitle;
