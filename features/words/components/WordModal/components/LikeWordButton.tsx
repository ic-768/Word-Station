import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useWordLikedStatus } from "features/words/hooks";

const LikeWordButton = ({ word }: { word: string }) => {
  const { handleLike, handleUnlike, isWordLikeStatusLoading, isWordLiked } =
    useWordLikedStatus(word);

  const [onClick, icon, color] = isWordLiked
    ? [handleUnlike, solidHeart, "text-red-600"]
    : [handleLike, emptyHeart, "text-neutral-800"];

  return (
    <FontAwesomeIcon
      fontSize={24}
      cursor="pointer"
      onClick={onClick}
      icon={icon}
      className={`w-12 ${color} hover:text-red-800 ${
        isWordLikeStatusLoading ? "animate-spin" : ""
      }`}
    />
  );
};

export default LikeWordButton;
