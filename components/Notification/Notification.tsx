import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NotificationProps {
  type?: "success" | "warning" | "error" | "informational";
  message: string;
}

type NotificationStyle = [icon: IconProp, fgColor: string, bgColor: string];

const Notification = ({
  type = "informational",
  message,
}: NotificationProps) => {
  const getStyle = (): NotificationStyle => {
    switch (type) {
      case "success":
        return [faCheck, "text-green-600", "bg-green-50"];
      case "error":
        return [faBan, "text-red-600", "bg-red-50"];
      case "warning":
        return [faTriangleExclamation, "text-amber-600", "bg-amber-50"];
      default:
        return [faInfo, "text-sky-600", "bg-sky-50"];
    }
  };

  const [icon, fgColor, bgColor] = useMemo(getStyle, [type]);

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center px-8 py-2 mx-auto bg-white drop-shadow-md ${fgColor} ${bgColor} rounded-md min-h-[60px] max-h-[10vh] min-w-[300px] max-w-[35vw] animation-fill-forwards animate-slide-notification-in`}
    >
      <FontAwesomeIcon icon={icon} className="absolute text-4xl left-8" />
      {message}
    </div>
  );
};

export default Notification;
