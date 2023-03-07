import { Dispatch, SetStateAction } from "react";
import { NotificationProps } from "../Notification/Notification";

// TODO could become a hook so we can bring the setNotification declaration in
export const handleAPICall = async (
  word: string,
  route: string,
  method: string,
  successMessage: string,
  errorMessage: string,
  setNotification: Dispatch<
    SetStateAction<NotificationProps | null | undefined>
  >,
  setIsWordSaved: Dispatch<SetStateAction<boolean>>
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
      setIsWordSaved((w) => !w);
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
