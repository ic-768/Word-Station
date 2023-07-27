import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStyle } from "./utils/getStyle";

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
      className={`top-6 z-20 absolute gap-4 inset-0 flex items-center px-8 py-2 justify-center px-8 py-2 mx-auto bg-white outline ${fgColor} ${bgColor} ${outlineColor} rounded-md w-4/6 sm:w-2/6 h-28 sm:h-32 animation-fill-forwards animate-fade-notification-in`}
    >
      <FontAwesomeIcon icon={icon} className="h-5/6" />
      <span>{message}</span>
    </div>
  );
};

export default Notification;
