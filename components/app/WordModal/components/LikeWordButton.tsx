import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

interface LikeWordButtonProps {
  isWordSaved?: boolean;
  handleDelete: () => void;
  handleSave: () => void;
}
const LikeWordButton = ({
  isWordSaved,
  handleDelete,
  handleSave,
}: LikeWordButtonProps) => {
  const [onClick, icon, color] = isWordSaved
    ? [handleDelete, solidHeart, "text-red-600"]
    : [handleSave, emptyHeart, "text-neutral-800"];

  return (
    <FontAwesomeIcon
      fontSize={24}
      cursor="pointer"
      onClick={onClick}
      icon={icon}
      className={`w-12 ${color} hover:text-red-800 hover`}
    />
  );
};

export default LikeWordButton;
