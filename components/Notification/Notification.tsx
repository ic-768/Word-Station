import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStyle } from "./helpers";

export interface NotificationProps {
  type?: "success" | "warning" | "error" | "informational";
  message: string;
}

const Notification = ({
  type = "informational",
  message,
}: NotificationProps) => {
  const [icon, fgColor, bgColor, outlineColor] = useMemo(
    () => getStyle(type),
    [type]
  );

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center px-8 py-2 mx-auto bg-white outline ${fgColor} ${bgColor} ${outlineColor} rounded-md min-h-[60px] max-h-[10vh] min-w-[300px] max-w-[35vw] animation-fill-forwards animate-slide-notification-in`}
    >
      <FontAwesomeIcon icon={icon} className="absolute text-4xl left-8" />
      {message}
    </div>
  );
};

export default Notification;
