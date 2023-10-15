import { useContext } from "react";
import { NotificationContext } from "context/notification";

export const useNotification = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  return { notification, setNotification };
};
