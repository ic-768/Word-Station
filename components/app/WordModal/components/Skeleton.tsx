import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

/**
 * Create arbitrary number of grey lines with shiny background gradient as placeholders for actual data
 */
const generateLines = (numLines: number, classes: string) =>
  Array.from({ length: numLines }, (_, index) => (
    <div
      key={index}
      className={`h-3 my-2 rounded ${classes} bg-zinc-500 animate-gradient-x bg-skeleton-shine`}
    ></div>
  ));

/**
 * Skeleton for WordModal while data is loading
 */
const Skeleton = () => (
  <div className="absolute inset-x-0 flex flex-col items-center max-w-sm p-8 mx-auto bg-white rounded top-32 h-4/6 sm:max-w-lg">
    <FontAwesomeIcon
      fontSize={24}
      cursor="pointer"
      icon={faHeart}
      className={`w-12 text-zinc-500 animate-pulse`}
    />
    <div className="relative flex flex-col w-full h-full overflow-y-auto max-h-max">
      {generateLines(2, "w-32")}
      {generateLines(8, "w-full")}
      {generateLines(1, "w-36")}
      {generateLines(3, "w-32")}
    </div>
    <div className="sticky bottom-0 flex flex-col w-full pt-4 mt-auto gap-2">
      <div className="flex w-4/5 mx-auto text-white">
        <div className="w-24 h-10 ml-auto rounded animate-gradient-x bg-skeleton-shine"></div>
      </div>
      <div className="self-center w-9 px-2 py-1 rounded h-7 bg-zinc-500 animate-gradient-x bg-skeleton-shine"></div>
    </div>
  </div>
);

export default Skeleton;
