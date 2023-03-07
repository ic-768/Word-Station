import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBan,
  faCheck,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { NotificationProps } from "./Notification";

type NotificationStyle = [icon: IconProp, fgColor: string, bgColor: string];

export const getStyle = (
  type: NotificationProps["type"]
): NotificationStyle => {
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
