import { useContext } from "react";
import { NotificationContext } from "../../context/notification";

/**
 * Hook that calls a word CRUD endpoint and handles setting notifications based on the outcome
 */
export const useWordCRUD = () => {
  const [_notification, setNotification] = useContext(NotificationContext);

  return async (
    word: string,
    route: string,
    method: string,
    successMessage: string,
    errorMessage: string,
    successCallback: () => void
  ) => {
    try {
      const response = await fetch(`/api/word/${route}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
      if (response.ok) {
        setNotification({
          type: "success",
          message: successMessage,
        });
        successCallback();
      } else {
        setNotification({
          type: "error",
          message: errorMessage,
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };
};
