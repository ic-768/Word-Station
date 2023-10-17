import { useEffect, useState } from "react";
import { NotificationProps } from "features/notifications";

export const useNotificationState = () => {
  const [notification, setNotification] = useState<NotificationProps | null>();

  // remove notifications after a fixed amount of time
  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 4500);
    }
  }, [notification]);

  return { notification, setNotification };
};
