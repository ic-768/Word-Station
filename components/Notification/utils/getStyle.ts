import { NotificationProps } from "../Notification";
import {
  errorStyle,
  informationalStyle,
  NotificationStyle,
  successStyle,
  warningStyle,
} from "./styles";

export const getStyle = (
  type: NotificationProps["type"]
): NotificationStyle => {
  switch (type) {
    case "success":
      return successStyle;
    case "error":
      return errorStyle;
    case "warning":
      return warningStyle;
    default:
      return informationalStyle;
  }
};
