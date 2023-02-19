import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import {
  faBan,
  faCheck,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export interface NotificationProps {
  type?: "success" | "warning" | "error" | "informational";
  message: string;
}

// TODO css based on type
const Notification = ({
  type = "informational",
  message,
}: NotificationProps) => {
  const [icon, color] = useMemo(() => {
    switch (type) {
      case "success":
        return [faCheck, "text-green-600"];
      case "error":
        return [faBan, "text-red-600"];
      case "warning":
        return [faTriangleExclamation, "text-amber-600"];
      default:
        return [faInfo, "text-sky-600"];
    }
  }, [type]);

  return (
    <div
      className={`
      z-10
      drop-shadow-md
      ${color}
      flex
      items-center
      justify-center
      rounded-md
      absolute
      bg-white absolute flex items-center inset-0 px-8 py-2
      mx-auto min-h-[60px] max-h-[10vh] min-w-[300px] max-w-[35vw]
      animation-fill-forwards
      animate-slide-notification-in
      `}
    >
      <FontAwesomeIcon icon={icon} className="absolute text-4xl left-8" />
      {message}
    </div>
  );
};

export default Notification;
