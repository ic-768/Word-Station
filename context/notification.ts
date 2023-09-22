import React, { Dispatch, SetStateAction } from "react";
import { NotificationProps } from "../components";

type NotificationContextArgs = [
  NotificationProps | null | undefined,
  Dispatch<SetStateAction<NotificationProps | null | undefined>>
];

/**
 * Ctx to provide notification and setNotification to subcomponents. Is provided with state in outer app component.
 */
export const NotificationContext = React.createContext<NotificationContextArgs>(
  [null, () => null]
);
