import React, { Dispatch, SetStateAction } from "react";
import { Notification } from "../types/Notification";

type NotificationContextArgs = [
  Notification | null,
  Dispatch<SetStateAction<Notification | null>>
];

/**
 * Ctx to provide notification and setNotification to subcomponents. Is provided with state in outer app component.
 */
export const NotificationContext = React.createContext<NotificationContextArgs>(
  [null, () => null]
);
