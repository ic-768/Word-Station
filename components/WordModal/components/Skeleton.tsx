import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Skeleton = () => {
  // to achieve shine effect with animation
  const gradientBackground = {
    background:
      "linear-gradient(90deg, #71717a 33%, #d4d4d8 50%,#71717a 66%) #71717a",
  };
  const Line = ({ classes }: { classes: string }) => (
    <span
      className={`h-3 my-2 rounded ${classes} bg-zinc-500 animate-gradient-x`}
      style={gradientBackground}
    ></span>
  );

  return (
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 h-4/6">
      <div className="relative flex flex-col h-full overflow-y-auto text-neutral-800 max-h-max">
        <FontAwesomeIcon
          fontSize={24}
          cursor="pointer"
          icon={faHeart}
          className={`self-center w-12 text-zinc-500 animate-pulse`}
        />
        {[1, 2].map((i) => (
          <Line key={i} classes="w-32" />
        ))}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Line key={i} classes="w-full" />
        ))}

        <Line classes="w-36" />
        {[1, 2, 3].map((i) => (
          <Line key={i} classes="w-32" />
        ))}

        <div className="sticky bottom-0 flex mx-auto mt-auto text-white w-72">
          <span
            className="w-24 h-10 ml-auto rounded animate-gradient-x"
            style={gradientBackground}
          ></span>
        </div>
        <span
          className="w-6 h-6 mr-auto rounded bg-zinc-500 animate-gradient-x"
          style={gradientBackground}
        ></span>
      </div>
    </div>
  );
};

export default Skeleton;
