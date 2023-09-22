import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBan,
  faCheck,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export type NotificationStyle = [
  icon: IconProp,
  fgColor: string,
  bgColor: string,
  outlineColor: string
];

export const successStyle: NotificationStyle = [
  faCheck,
  "text-green-600",
  "bg-green-50",
  "outline-green-800",
];

export const errorStyle: NotificationStyle = [
  faBan,
  "text-red-600",
  "bg-red-50",
  "outline-red-800",
];

export const warningStyle: NotificationStyle = [
  faTriangleExclamation,
  "text-amber-600",
  "bg-amber-50",
  "outline-amber-800",
];

export const informationalStyle: NotificationStyle = [
  faInfo,
  "text-sky-600",
  "bg-sky-50",
  "outline-sky-800",
];
