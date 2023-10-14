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
  "text-white",
  "bg-green-500",
  "outline-green-800",
];

export const errorStyle: NotificationStyle = [
  faBan,
  "text-white",
  "bg-red-500",
  "outline-red-800",
];

export const warningStyle: NotificationStyle = [
  faTriangleExclamation,
  "text-white",
  "bg-amber-500",
  "outline-amber-800",
];

export const informationalStyle: NotificationStyle = [
  faInfo,
  "text-white",
  "bg-sky-500",
  "outline-sky-800",
];
